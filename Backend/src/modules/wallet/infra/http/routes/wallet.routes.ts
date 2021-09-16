import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import WalletsControllers from '../controllers/WalletsControllers';
import Authentication from '@shared/infra/http/middlewares/Authentication';
import { is } from '@shared/infra/http/middlewares/permissions';

const walletsRoutes = Router();

const walletsControllers = new WalletsControllers;
const authentication = new Authentication;

walletsRoutes.get(
    '/balance',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required(),
        }).options({ allowUnknown: true }),
    }),
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER']),
    walletsControllers.getWalletUser
);

walletsRoutes.post(
    '/withdraw',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required()
        }).options({ allowUnknown: true }),
        [Segments.BODY]: Joi.object({
            keyWallet: Joi.string().required(),
            value: Joi.number().required(),
            type: Joi.string().required()
        })
    }),
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER']),
    walletsControllers.withdraw
);

walletsRoutes.put(
    '/keys',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required()
        }).options({ allowUnknown: true }),
        [Segments.BODY]: Joi.object({
            pixKey: Joi.string().optional(),
            blockchainKey: Joi.string().optional()
        })
    }),
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER']),
    walletsControllers.keysUpdate
)

export default walletsRoutes;