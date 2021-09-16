import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { is } from '@shared/infra/http/middlewares/permissions';
import PaymentsControllers from "../controllers/PaymentsControllers";
import Authentication from "@shared/infra/http/middlewares/Authentication";

const paymentsRoutes = Router();

const authentication = new Authentication;
const paymentsControllers = new PaymentsControllers;

paymentsRoutes.get(
    '/',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required(),
        }).options({ allowUnknown: true }),
    }),
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER']),
    paymentsControllers.getAll
)

paymentsRoutes.post(
    '/confirm',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            
        }).options({ allowUnknown: true }),
        [Segments.BODY]: Joi.object({

        }).options({ allowUnknown: true })
    }),
    paymentsControllers.paymentConfirmation
);

export default paymentsRoutes;