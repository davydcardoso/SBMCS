import { QueryRunner } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import MyRequestsRepository from "@modules/users/infra/typeorm/repositories/MyRequestsRepository";
import { statusToCode } from "global/statusPlisioInvoiceGlobal";
import { stCompleted } from "global/statusResponsePlisioInvoiceGlobal";
import { IPlisioCallback } from "../interfaces/IPlisioCallback";

export default class CreateUserRequestServices {

    constructor(
        private transaction: QueryRunner
    ) { }

    public async execute(userId: string, saleValue: number, invoice: IPlisioCallback): Promise<void> {
        const myRequestReposity = this.transaction.manager.getCustomRepository(MyRequestsRepository);
        const userRequest = myRequestReposity.create({
            id: GETUUID().toUpperCase(),
            status: statusToCode(stCompleted),
            userId: userId,
            value: saleValue,
            invoicePlisioCode: invoice.txn_id,
            createdAt: new Date()
        });

        await this.transaction.manager.save(userRequest);
    }
}