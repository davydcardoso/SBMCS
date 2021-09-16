import { getConnection } from "typeorm";
import WalletsRepository from "../infra/typeorm/repositories/WalletsRepository";


export default class RecordsUsersWalletMovementServices {
    public async execute(userId: string, bitcoin: number, money: number, updatedAt: Date): Promise<void> {
        const walletUserRepository = getConnection('Postgres').getCustomRepository(WalletsRepository);
        await walletUserRepository.update(userId, {
            bitcoinValue: bitcoin,
            moneyValue: money
        })
    }
}
