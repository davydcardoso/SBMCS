import { EntityManager, getConnection, QueryRunner } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import { IndicationNode } from "../infra/typeorm/entities/IndicationNode";
import IndicationCodeRepository from "../infra/typeorm/repositories/IndicationCodeRepository";
import IndicationNodeRepository from "../infra/typeorm/repositories/IndicationNodeRepository";


export default class SaveIndicationUserServices {

    constructor(
        private transaction: QueryRunner
    ) { }

    public async execute(user: string, indicationCode: string): Promise<void> {
        const indicationNodeRepository = this.transaction.manager.getCustomRepository(IndicationNodeRepository);
        const saveIndicationNode = indicationNodeRepository.create({
            id: GETUUID().toUpperCase(),
            indicator: indicationCode,
            userId: user
        });
        await this.transaction.manager.save(saveIndicationNode);
    }
}