import { Request, Response } from "express";

import SearchFinancialStatementServices from "@modules/financial/services/SearchFinancialStatementServices";
import Authentication from "@shared/infra/http/middlewares/Authentication";

export default class FinancialControllers {
    public async extract(request: Request, response: Response): Promise<Response> {
        try {
            const searchFinancialStatementServices = new SearchFinancialStatementServices;
            const authentication = new Authentication;

            const { x_token_api } = request.headers;

            const tokenDecoded = authentication.decodToken(x_token_api as string);

            const financialUser = await searchFinancialStatementServices.execute(tokenDecoded.payload.sub);

            return response.json({ financialUser });
        } catch (err: any) {
            return response.status(400).json({ message: err.message });
        }
    }
}