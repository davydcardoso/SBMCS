import { Request, Response } from "express";
import crypto, { verify } from 'crypto';
import { v4 as GETUUID } from 'uuid';
import { hash } from "bcryptjs";

import CreateUsersServices from "@modules/users/services/CreateUsersServices";
import { IUserRequestData } from "@modules/users/interface/IUserRequestData";
import SendEmailRecoverPasswordServices from "@modules/users/services/SendEmailRecoverPasswordServices";
import { getConnection } from "typeorm";
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import SaveTokenRecoverPasswordServices from '@modules/users/services/SaveTokenRecoverPasswordServices';
import UpdateUserPasswordServices from "@modules/users/services/UpdateUserPasswordServices";
import RecoverPasswordRepository from '@modules/users/infra/typeorm/repositories/RecoverPasswordRepository';
import Authentication from '@shared/infra/http/middlewares/Authentication';
import GetOrGenerateIndicationCodeServices from '@modules/users/services/GetOrGenerateIndicationCodeServices';
import SaveIndicationUserServices from '@modules/users/services/SaveIndicationUserServices';
import CreateWalletsUserServices from '@modules/users/services/CreateWalletsUserServices';
import UpdateUsersServices from '@modules/users/services/UpdateUsersServices';
import { IUserUpdateData } from "@modules/users/interface/IUserUpdateData";
import { Users } from "../../typeorm/entities/Users";

interface IRecoverPasswordBodyData {
    email: string;
    last_password?: string;
    new_password?: string;
    confirm_password?: string;
    recover_code: string;
    indication_code?: string;
}

export default class UsersControllers {
    public async create(request: Request, response: Response): Promise<Response> {
        const transaction = getConnection('Postgres').createQueryRunner();

        await transaction.connect();

        await transaction.startTransaction();
        try {
            const createUsersService = new CreateUsersServices(transaction);
            const saveIndicationUserServices = new SaveIndicationUserServices(transaction);
            const createWalletsUserServices = new CreateWalletsUserServices(transaction);

            const userRepository = getConnection('Postgres').getCustomRepository(UserRepository);

            const { name, surname, password, email, type, phone, cpf, indication_code }: IUserRequestData = request.body;

            const userId = GETUUID().toUpperCase();

            const existEmail = await userRepository.findOne({ email });

            const existPhone = await userRepository.findOne({ phone });

            if (existEmail) {
                throw new Error('User already registered in the system!');
            }

            if (existPhone) {
                throw new Error('User already registered in the system!');
            }

            if (indication_code) {
                await saveIndicationUserServices.execute(userId, indication_code)
            }

            await createWalletsUserServices.execute(userId);

            const userCreate = await createUsersService.execute({ name, surname, password, email, type, phone, cpf, id: userId });

            await transaction.commitTransaction();

            //@ts-ignore
            delete userCreate.avatar;

            //@ts-ignore
            delete userCreate.password;

            return response.status(201).json({ userCreate });
        } catch (err: any) {
            await transaction.rollbackTransaction();
            return response.status(400).json({ message: err.message });
        } finally {
            await transaction.release();
        }
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const transaction = getConnection('Postgres').createQueryRunner();

        await transaction.connect();

        await transaction.startTransaction();
        try {
            const updateUsersServices = new UpdateUsersServices(transaction);
            const authentication = new Authentication;

            const { avatar, surname, cpf, email, name, phone } = request.body as IUserUpdateData;

            const token = request.headers.x_token_api as string;

            const tokenDecoded = authentication.decodToken(token);

            const resultUpdate = await updateUsersServices.execute(tokenDecoded.payload.sub, { avatar, surname, cpf, email, name, phone });

            await transaction.commitTransaction();

            return response.status(201).json({ resultUpdate });
        } catch (err: any) {
            await transaction.rollbackTransaction();
            return response.status(400).json({ message: err.message });
        } finally {
            await transaction.release();
        }
    }

    public async requestRecoverPassword(request: Request, response: Response): Promise<Response> {
        try {
            const sendEmailRecoverPasswordServices = new SendEmailRecoverPasswordServices;
            const userRepository = getConnection('Postgres').getCustomRepository(UserRepository);
            const saveTokenRecoverPasswordServices = new SaveTokenRecoverPasswordServices;

            const { email }: IRecoverPasswordBodyData = request.body;

            const user = await userRepository.findOne({ email });

            if (!user) {
                return response.status(400).json({ message: 'User not found' })
            }

            const token = crypto.randomBytes(20).toString('hex');

            const expiredDate = new Date();
            expiredDate.setMinutes(expiredDate.getMinutes() + 10);

            await saveTokenRecoverPasswordServices.execute({
                id: GETUUID().toUpperCase(),
                userId: user.id,
                codeRecover: token,
                expiredTime: expiredDate,
                createdAt: new Date()
            });

            await sendEmailRecoverPasswordServices.execute(email, token);

            return response.status(200).json({ message: 'Password verification email sent successfully' })
        } catch (err: any) {
            return response.status(400).json({ message: err.message });
        }
    }

    public async recoverPassword(request: Request, response: Response): Promise<Response> {
        try {
            const updateUserPasswordServices = new UpdateUserPasswordServices;
            const userRepository = getConnection('Postgres').getCustomRepository(UserRepository);
            const recoverPasswordRepository = getConnection('Postgres').getCustomRepository(RecoverPasswordRepository);

            const { email, last_password, new_password, confirm_password, recover_code }: IRecoverPasswordBodyData = request.body;

            // const passwordVerify = last_password as string;

            const user = await userRepository.findOne({ email });

            if (!user) {
                return response.status(401).json({ message: 'User not found' });
            }

            // if (user.password !== await hash(passwordVerify, 8)) {
            //     return response.status(400).json({ message: 'Password is not correct' });
            // }

            if (new_password !== confirm_password) {
                return response.status(400).json({ message: 'New passwords are not the same' });
            }

            const recoverPassword = await recoverPasswordRepository.findOne({ userId: user.id });

            if (!recoverPassword) {
                return response.status(400).json({ message: 'No password request for this user' });
            }

            if (recoverPassword.codeRecover !== recover_code) {
                return response.status(400).json({ message: 'Invalid password change code' });
            }

            const nowDate = new Date();

            if (recoverPassword.expiredTime < nowDate) {
                return response.status(400).json({ message: 'Expired password change code' });
            }

            await updateUserPasswordServices.execute({ password: await hash(new_password as string, 8), email, id: user.id });

            await recoverPasswordRepository.delete({ userId: user.id });

            return response.status(201).json({ message: 'User password changed successfully' });
        } catch (err: any) {
            return response.status(400).json({ message: err.message });
        }
    }

    public async indicationCode(request: Request, response: Response): Promise<Response> {
        try {
            const authentication = new Authentication;

            const tokendecoded = authentication.decodToken(request.headers.x_token_api as string);

            const getOrGenerateIndicationCodeServices = new GetOrGenerateIndicationCodeServices;

            const indicationCode = await getOrGenerateIndicationCodeServices.execute(tokendecoded);

            return response.status(201).json({ indicationCode: indicationCode });
        } catch (err: any) {
            return response.status(400).json({ message: err.message })
        }
    }

    public async tasks(request: Request, response: Response): Promise<Response> {
        try {

            return response.status(200).json({})
        } catch (err: any) {
            return response.status(400).json({ message: err.message });
        }
    }

}