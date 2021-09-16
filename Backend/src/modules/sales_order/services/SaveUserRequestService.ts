import { QueryRunner } from "typeorm";
import { SalesOrders } from "../infra/typeorm/entities/SalesOrders";
import { IResponsePlisio } from "../interfaces/IResponsePlisio";


export default class SaveUserRequestService {

    constructor(
        private transaction: QueryRunner
    ) { }

    public async execute(plisioData: IResponsePlisio, saleCreated: SalesOrders): Promise<void> { 
        
    }
}