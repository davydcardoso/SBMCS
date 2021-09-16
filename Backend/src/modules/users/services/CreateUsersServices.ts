import { EntityManager, getConnection, getCustomRepository, QueryRunner } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';
import { IUserRequestData } from '@modules/users/interface/IUserRequestData';
import { ICreateUserReturnData } from "../interface/ICreateUserReturnData";
import { hash } from "bcryptjs";
import { Users } from "../infra/typeorm/entities/Users";
import { avatar } from '@config/avatar';


export default class CreateUsersServices {

    constructor(
        private transaction: QueryRunner
    ) { }

    public async execute(data: IUserRequestData): Promise<Users> {

        const userRepository = this.transaction.manager.getCustomRepository(UserRepository);
        const rolesRepository = this.transaction.manager.getCustomRepository(RolesRepository);

        const { name, surname, password, email, type, phone, cpf, id } = data;

        const passwordHash = await hash(password, 8);

        const existRoles = await rolesRepository.find({ where: { name: 'ROLE_USER' } });

        const user = userRepository.create({
            id: id,
            name: name,
            surname: surname,
            email: email,
            cpf: cpf,
            phone: phone,
            password: passwordHash,
            createAt: new Date,
            avatar: avatar.image,
            roles: existRoles
        });

        await this.transaction.manager.save(user);

        return user;
    }
}