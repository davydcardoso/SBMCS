import { QueryRunner } from "typeorm";
import WalletsRepository from "../infra/typeorm/repositories/WalletsRepository";


export default class AddUserWalletBalanceServices {

    constructor(
        private transaction: QueryRunner
    ) { }

    public async execute(userId: string, balanceToAdd: number): Promise<void> {
        const walletsRepository = this.transaction.manager.getCustomRepository(WalletsRepository);

        const walletBalance = await walletsRepository.findOne({ userId });

        if (!walletBalance) {
            throw new Error('User wallet not found');
        }

        console.log(walletBalance.moneyValue + balanceToAdd)

        await walletsRepository.update({ userId: userId }, {
            moneyValue: balanceToAdd + walletBalance.moneyValue 
        });
    }
}