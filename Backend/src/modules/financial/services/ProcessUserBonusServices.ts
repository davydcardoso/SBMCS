import { QueryRunner } from "typeorm";

import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import IndicationNodeRepository from "@modules/users/infra/typeorm/repositories/IndicationNodeRepository";
import { IPlisioCallback } from "@modules/sales_order/interfaces/IPlisioCallback";
import AddUserWalletBalanceServices from "@modules/wallet/services/AddUserWalletBalanceServices";

export default class ProcessUserBonusServices {

    constructor(
        private transaction: QueryRunner
    ) { }

    public async execute(userId: string, invoice: IPlisioCallback, valuePayment: number): Promise<void> {
        const addUserWalletBalanceServices = new AddUserWalletBalanceServices(this.transaction);

        const userRepository = this.transaction.manager.getCustomRepository(UserRepository);
        const indicationNoteRepository = this.transaction.manager.getCustomRepository(IndicationNodeRepository);

        const directIndicatorCode = await indicationNoteRepository.findOne({ where: { userId } });

        if (directIndicatorCode) {
            let indirectIndicator;
            const directIndicationValue: number = 5;
            const indirectIndicatorValue: number = 2;

            const directIndicator = await userRepository.findOne({ where: { indicationCode: directIndicatorCode.indicator } });

            if (!directIndicator) {
                throw new Error('Unexpected error: User pointer not found');
            }

            const directBonusAmount = (directIndicationValue * valuePayment) / 100;
            console.log(directBonusAmount)

            await addUserWalletBalanceServices.execute(directIndicator.id, directBonusAmount);
        }
    }
}