import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import { is } from '@shared/infra/http/middlewares/permissions';
import SalesOrdersControllers from '@modules/sales_order/infra/http/controllers/SalesOrdersControllers';
import Authentication from "@shared/infra/http/middlewares/Authentication";

const salesOrderRoutes = Router();

const authentication = new Authentication;
const salesOrdersControllers = new SalesOrdersControllers;

salesOrderRoutes.post(
    '/',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required(),
        }).options({ allowUnknown: true }),
        [Segments.BODY]: {
            products: Joi.string().required(),
            payment: Joi.string().required()
        }
    }),
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER']),
    salesOrdersControllers.create
);

salesOrderRoutes.get(
    '/',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required(),
        }).options({ allowUnknown: true }),
    }),
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER']),
    salesOrdersControllers.myRequest
);

export default salesOrderRoutes;