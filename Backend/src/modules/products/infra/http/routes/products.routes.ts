import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { is } from '@shared/infra/http/middlewares/permissions';
import ProductsControllers from '@modules/products/infra/http/controllers/ProductsControllers';
import Authentication from "@shared/infra/http/middlewares/Authentication";

const productsRoutes = Router();

const authentication = new Authentication;
const productsControllers = new ProductsControllers;

productsRoutes.get(
    '/',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required(),
        }).options({ allowUnknown: true })
    }),
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER']),
    productsControllers.getAllProducts
);

productsRoutes.get(
    '/:id',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required(),
        }).options({ allowUnknown: true }),
        [Segments.PARAMS]: {
            id: Joi.string().required()
        }
    }),
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER']),
    productsControllers.getOne
)

export default productsRoutes;
