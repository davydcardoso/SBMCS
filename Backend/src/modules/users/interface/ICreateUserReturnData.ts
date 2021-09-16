import { Users } from "../infra/typeorm/entities/Users";

export interface ICreateUserReturnData {
    status: number;
    data: {
        message: string;
        userData?: Users;
    }
}