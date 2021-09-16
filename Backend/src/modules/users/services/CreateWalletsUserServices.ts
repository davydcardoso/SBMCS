import { EntityManager, getConnection, QueryRunner } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import WalletsRepository from "@modules/wallet/infra/typeorm/repositories/WalletsRepository";

export default class CreateWalletsUserServices {

    constructor(
        private transaction: QueryRunner,
    ) { }

    public async execute( user: string): Promise<void> {
        const walletsRepository = this.transaction.manager.getCustomRepository(WalletsRepository);
        const createdAtWallets = walletsRepository.create({
            id: GETUUID().toUpperCase(),
            userId: user,
            createdAt: new Date(),
            moneyValue: 0.00
        });
        await this.transaction.manager.save(createdAtWallets);
    }
}