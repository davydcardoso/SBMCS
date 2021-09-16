import { getConnection } from "typeorm";
import { SalesOrders } from "../infra/typeorm/entities/SalesOrders";
import SalesOrderRepository from "../infra/typeorm/repositories/SalersOrderRepository";


export default class FetchMySalesOrdersServices {
    public async execute(userId: string): Promise<SalesOrders[]> {
        const salesOrderRepository = getConnection('Postgres').getCustomRepository(SalesOrderRepository);
        return salesOrderRepository.find({ userId });
    }
}