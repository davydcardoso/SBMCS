import { QueryRunner } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import WithdrawRepository from "@modules/financial/infra/typeorm/repositories/WithdrawRepository";
import { IWithdrawRequest } from "../interfaces/IWithdrawRequest";
import { statusToCode } from "global/statusPlisioInvoiceGlobal";
import { stCancelled, stNew } from "global/statusResponsePlisioInvoiceGlobal";
import WalletsRepository from "../infra/typeorm/repositories/WalletsRepository";

export default class WithdrawWalletBalanceServices {

    constructor(
        private transaction: QueryRunner
    ) { }

    public async execute(userId: string, data: IWithdrawRequest): Promise<void> {
        const withdrawRepository = this.transaction.manager.getCustomRepository(WithdrawRepository);
        const walletsRepository = this.transaction.manager.getCustomRepository(WalletsRepository);

        const wallets = await walletsRepository.findOne({ userId });

        if (!wallets) {
            throw new Error('Users wallet not registered');
        }

        if (wallets.moneyValue < data.value) {
            throw new Error('User wallet without sufficient balance');
        }

        await walletsRepository.update({ userId }, {
            moneyValue: (wallets.moneyValue - data.value)
        });

        const withdraw = withdrawRepository.create({
            id: GETUUID().toUpperCase(),
            status: statusToCode(stNew),
            userId: userId,
            keyWallet: data.keyWallet,
            valueWithdraw: data.value,
            typeWithdraw: data.type,
            createdAt: new Date()
        });
        await this.transaction.manager.save(withdraw);
    }
}