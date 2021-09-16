import { getConnection } from "typeorm";
import { Financial } from "../infra/typeorm/entities/Financial";
import FinancialRepository from "../infra/typeorm/repositories/FinancialRepository";

export default class SearchFinancialStatementServices {
    public async execute(userId: string): Promise<Financial[]> {
        const financialRepository = getConnection('Postgres').getCustomRepository(FinancialRepository);
        return await financialRepository.find({ userId })
    }
}