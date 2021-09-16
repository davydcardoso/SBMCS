import { statusToCode } from "global/statusPlisioInvoiceGlobal";
import { QueryRunner } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import FinancialRepository from "../infra/typeorm/repositories/FinancialRepository";

export default class GenerateFinancialUserServices {

    constructor(
        private transaction: QueryRunner
    ) { }

    public async execute(type: string, status: string, userId: string, value: number): Promise<void> {
        const financialRepository = this.transaction.manager.getCustomRepository(FinancialRepository);
        const financial = financialRepository.create({
            id: GETUUID().toUpperCase(),
            type: type,
            status: statusToCode(status),
            userId: userId,
            value: value,
            createdAt: new Date()
        });
        await this.transaction.manager.save(financial);
    }
}