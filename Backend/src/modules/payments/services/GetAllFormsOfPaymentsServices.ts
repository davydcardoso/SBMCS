import { getConnection } from "typeorm";

import { FormsPayments } from "../infra/typeorm/entities/FormsPayments";
import FormsPaymentsRepository from "../infra/typeorm/repositories/FormsPaymentsServices";

export default class GetAllFormsOfPaymentsServices {
    public async execute(): Promise<FormsPayments[] | null> {
        const paymentsRepository = getConnection('Postgres').getCustomRepository(FormsPaymentsRepository);

        return await paymentsRepository.find();
    }
}