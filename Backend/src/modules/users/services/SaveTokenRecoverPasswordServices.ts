import { getConnection } from "typeorm";
import { RecoverPassword } from "../infra/typeorm/entities/RecoverPassword";

interface ITokenRecoverPasswordData {
    id: string;
    userId: string;
    codeRecover: string;
    expiredTime: Date;
    createdAt: Date;
}

export default class SaveTokenRecoverPasswordServices {
    public async execute(data: ITokenRecoverPasswordData): Promise<void> {
        await getConnection('Postgres')
            .createQueryBuilder()
            .insert()
            .into(RecoverPassword)
            .values(data)
            .execute();
    }
}