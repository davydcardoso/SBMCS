import { getConnection, QueryRunner } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import { MyRequests } from "@modules/users/infra/typeorm/entities/MyRequests";
import { IPlisioCallback } from "../interfaces/IPlisioCallback";
import { stCancelled, stCompleted, stPending } from "global/statusResponsePlisioInvoiceGlobal";
import { statusToCode } from "global/statusPlisioInvoiceGlobal";
import SalesOrderRepository from "../infra/typeorm/repositories/SalersOrderRepository";
import ProcessUserBonusServices from "@modules/financial/services/ProcessUserBonusServices";
import CreateUserRequestServices from "./CreateUserRequestServices";
import GenerateFinancialUserServices from "@modules/financial/services/GenerateFinancialUserServices";

export default class ProcessUserPaymentServices {

    constructor(
        private transaction: QueryRunner
    ) { }

    public async execute(status: string, invoice: IPlisioCallback): Promise<void> {
        const createUserRequestServices = new CreateUserRequestServices(this.transaction);
        const generateFinancialUserServices = new GenerateFinancialUserServices(this.transaction);

        const saleOrderRepository = this.transaction.manager.getCustomRepository(SalesOrderRepository);
        const processUserBonusServices = new ProcessUserBonusServices(this.transaction);

        const sale = await saleOrderRepository.findOne({ where: { plisioInvoiceId: invoice.txn_id } });

        if (!sale) {
            throw new Error('Unable to process payment, sale not found');
        }
       
        switch (status) {
            case stPending:

                break;
            case stCompleted:

                const saleVerify = await saleOrderRepository.findOne(sale.id);
                
                if (!saleVerify) {
                    throw new Error('Unexpected error: Sale not found');
                }

                if (saleVerify.statusPayment === statusToCode(stCompleted)) {
                    throw new Error('Sale and payment have already been processed');
                }

                // await saleOrderRepository.update(sale.id, { statusPayment: statusToCode(stCompleted) });
                // await createUserRequestServices.execute(sale.userId, sale.value, invoice);
                await processUserBonusServices.execute(sale.userId, invoice, sale.value);
                // await generateFinancialUserServices.execute('C', stCompleted, sale.userId, sale.value)
                break;
            case stCancelled:
                await saleOrderRepository.update(sale.userId, { statusPayment: statusToCode(stCancelled) });
                break;
            default:
                break;
        }
    }
}