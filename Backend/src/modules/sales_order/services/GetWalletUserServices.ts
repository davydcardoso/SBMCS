import { getConnection } from "typeorm";

import { Wallets } from "@modules/wallet/infra/typeorm/entities/Wallets";
import WalletsRepository from "@modules/wallet/infra/typeorm/repositories/WalletsRepository";

export default class GetWalletUserServices {
    public async execute(userId: string): Promise<Wallets> {
        const walletsRepository = getConnection('Postgres').getCustomRepository(WalletsRepository);
        const wallets = await walletsRepository.findOne({ userId });

        if (!wallets) {
            throw new Error('Wallet user not found');
        }

        return wallets;

    }
}