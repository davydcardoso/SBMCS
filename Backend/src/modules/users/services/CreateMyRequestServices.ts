import { QueryRunner } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import MyRequestsRepository from "../infra/typeorm/repositories/MyRequestsRepository";
import { statusToCode } from "global/statusPlisioInvoiceGlobal";
import { stPending } from "global/statusResponsePlisioInvoiceGlobal";

interface IRequestUser {
    userId: string;
    value: number;
    invoicePlisioCode: string;
}

export default class CreateMyRequestServices {

    constructor(
        private transaction: QueryRunner
    ) { }

    public async execute(requestUser: IRequestUser): Promise<void> {
        const myRequestReposity = this.transaction.manager.getCustomRepository(MyRequestsRepository)
        const request = myRequestReposity.create({
            id: GETUUID().toUpperCase(),
            status: statusToCode(stPending),
            invoicePlisioCode: requestUser.invoicePlisioCode,
            userId: requestUser.userId,
            value: requestUser.value,
            createdAt: new Date()
        });
        await this.transaction.manager.save(request);
    }
}