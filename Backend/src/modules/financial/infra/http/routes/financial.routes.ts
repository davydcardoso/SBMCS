import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { is } from '@shared/infra/http/middlewares/permissions';
import Authentication from "@shared/infra/http/middlewares/Authentication";
import FinancialControllers from "../controllers/FinancialControllers";

const financialRoutes = Router();

const financialControllers = new FinancialControllers;
const authentication = new Authentication;

financialRoutes.get(
    '/extract',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required()
        }).options({ allowUnknown: true })
    }),
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER']),
    financialControllers.extract
);

export default financialRoutes;