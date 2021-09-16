import { getConnection } from 'typeorm';

import { Users } from '@modules/users/infra/typeorm/entities/Users';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

interface IUserData {
    id: string;
    password: string;
    email: string;
}

export default class UpdateUserPasswordServices {
    public async execute(data: IUserData): Promise<void> {
        await getConnection('Postgres')
            .createQueryBuilder()
            .update(Users)
            .set({ password: data.password })
            .where('email = :pEmail', { pEmail: data.email })
            .andWhere('id = :pUserId', { pUserId: data.id })
            .execute();
    }
}