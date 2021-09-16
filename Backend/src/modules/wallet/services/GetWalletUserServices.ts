import { getConnection } from "typeorm";
import { Wallets } from "../infra/typeorm/entities/Wallets";
import WalletsRepository from "../infra/typeorm/repositories/WalletsRepository";

export default class GetWalletsUserServices {
    public async execute(user: string): Promise<Wallets> {
        const walletsRepository = getConnection('Postgres').getCustomRepository(WalletsRepository);
        const wallet = await walletsRepository.findOne({ userId: user });

        if (!wallet) {
            throw new Error('Wallet not found');
        }
        
        return wallet;
    }
}