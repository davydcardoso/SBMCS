import { Request, Response } from "express";

import GetWalletsUserServices from "@modules/wallet/services/GetWalletUserServices";
import Authentication from "@shared/infra/http/middlewares/Authentication";
import WithdrawWalletBalanceServices from "@modules/wallet/services/WithdrawWalletBalanceServices";
import { getConnection } from "typeorm";
import { IWithdrawRequest } from "@modules/wallet/interfaces/IWithdrawRequest";

export default class WalletsControllers {
    public async getWalletUser(request: Request, response: Response): Promise<Response> {
        try {
            const getWalletsUserServices = new GetWalletsUserServices;
            const authentication = new Authentication;

            const { x_token_api } = request.headers;

            const userData = authentication.decodToken(x_token_api as string);

            const walletUser = await getWalletsUserServices.execute(userData.payload.sub);

            return response.status(200).json({ walletUser });
        } catch (err: any) {
            return response.status(400).json({ message: err.message });
        }
    }

    public async withdraw(request: Request, response: Response): Promise<Response> {
        const transaction = getConnection('Postgres').createQueryRunner();

        await transaction.connect();

        await transaction.startTransaction();
        try {
            const withdrawWalletBalanceServices = new WithdrawWalletBalanceServices(transaction);
            const authentication = new Authentication;

            const { x_token_api } = request.headers;

            const { keyWallet, value, type } = request.body as IWithdrawRequest;

            const tokenDecoded = authentication.decodToken(x_token_api as string);

            await withdrawWalletBalanceServices.execute(tokenDecoded.payload.sub, { type, value, keyWallet });

            await transaction.commitTransaction();

            return response.status(201).json({ message: 'withdrawal requested successfully, wait for confirmation from the administration' });
        } catch (err: any) {
            await transaction.rollbackTransaction();
            return response.status(400).json({ message: err.message });
        } finally {
            await transaction.release();
        }
    }

    public async keysUpdate(request: Request, response: Response): Promise<Response> {
        const transaction = getConnection('Postgres').createQueryRunner();

        await transaction.connect();

        await transaction.startTransaction();
        try {

            const {  } = request.body; 

            await transaction.commitTransaction();

            return response.status(201).json({});
        } catch (err: any) {
            await transaction.rollbackTransaction();
            return response.status(400).json({ message: err.message });
        } finally {
            await transaction.release();
        }
    }

}