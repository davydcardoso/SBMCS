import { getConnection, QueryRunner } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import { SalesHistory } from "../infra/typeorm/entities/SalesHistory";
import SalesHistoryRepository from "../infra/typeorm/repositories/SalesHistoryRepository";

export default class SaveSalesHistoryServices {

    constructor(
        private transaction: QueryRunner
    ) {}

    public async execute(userId: string, valueSale: number, typePayment: string, orderSaleId: string): Promise<SalesHistory> {
        const salesHistoryRepository = this.transaction.manager.getCustomRepository(SalesHistoryRepository);
        const createdSalesHistory = salesHistoryRepository.create(
            {
                id: GETUUID().toUpperCase(),
                userId: userId,
                orderSaleId: orderSaleId,
                saleValue: valueSale,
                typePayment: typePayment,
                createdAt: new Date()
            }
        );

        await this.transaction.manager.save(createdSalesHistory);

        return createdSalesHistory
    }
}