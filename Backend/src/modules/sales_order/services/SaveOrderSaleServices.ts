import { stPending } from "global/statusOrderSalesGlobal";
import { getConnection, QueryRunner } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import { SalesOrders } from "../infra/typeorm/entities/SalesOrders";
import SalesOrderRepository from "../infra/typeorm/repositories/SalersOrderRepository";

export default class SaveOrderSaleServices {

    constructor(
        private transaction: QueryRunner
    ) {}

    public async execute(plisioInvoiceId: string, plisioInvoiceUrl: string, valueSale: number, vitualCoin: number, userId: string, saleType: string): Promise<SalesOrders> {
        const salesOrderRepository = this.transaction.manager.getCustomRepository(SalesOrderRepository);
        const createdSale = salesOrderRepository.create(
            {
                id: GETUUID().toUpperCase(),
                userId: userId,
                plisioInvoiceId: plisioInvoiceId,
                plisioInvoiceUrl: plisioInvoiceUrl,
                statusPayment: stPending,
                registerDate: new Date(),
                createdAt: new Date(),
                saleType: saleType,
                value: valueSale,
                virtualCurrencyValue: vitualCoin
            }
        );
        await this.transaction.manager.save(createdSale);

        return createdSale;
    }
}