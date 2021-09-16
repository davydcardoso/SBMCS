import { getConnection, QueryRunner, UpdateResult } from "typeorm";

import { Users } from "../infra/typeorm/entities/Users";
import UserRepository from "../infra/typeorm/repositories/UserRepository";
import { IUserUpdateData } from "../interface/IUserUpdateData";

export default class UpdateUsersServices {

    constructor (
        private transaction: QueryRunner
    ) {}

    public async execute(userid: string, data: IUserUpdateData): Promise<UpdateResult> {
        const usersRepository = this.transaction.manager.getCustomRepository(UserRepository);

        const verifyUserEmail = await usersRepository.findOne({ email: data.email });
        const verifyUserPhone = await usersRepository.findOne({ phone: data.phone });

        if (verifyUserEmail && verifyUserEmail.id !== userid) {
            throw new Error('This email is already being used by another user!');
        }

        if (verifyUserPhone && verifyUserPhone.id !== userid) {
            throw new Error('This phone is already registered!');
        }

        const usersOld = await usersRepository.findOne(userid);

        if (!usersOld) {
            throw new Error('User not found');
        }

        return await usersRepository.update(userid, {
            name: data.name == undefined ? usersOld.name : data.name,
            surname: data.surname == undefined ? usersOld.surname : data.surname,
            avatar: data.avatar == undefined ? usersOld.avatar : data.avatar,
            phone: data.phone == undefined ? usersOld.phone : data.phone,
            email: data.email == undefined ? usersOld.email : data.email,
            cpf: data.cpf == undefined ? usersOld.cpf : data.cpf
        });
    }
}