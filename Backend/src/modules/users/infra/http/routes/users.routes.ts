import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import UsersControllers from '@modules/users/infra/http/controllers/UsersControllers';
import SessionControllers from '@modules/users/infra/http/controllers/SessionControllers';
import PermissionsControllers from '@modules/users/infra/http/controllers/PermissionsControllers';
import RolesControllers from '@modules/users/infra/http/controllers/RoleControllers';
import Authentication from "@shared/infra/http/middlewares/Authentication";
import { is } from '@shared/infra/http/middlewares/permissions';

const usersRoutes = Router();

const authentication = new Authentication;
const usersControllers = new UsersControllers;
const sessionControllers = new SessionControllers;
const permissionsControllers = new PermissionsControllers;
const rolesControllers = new RolesControllers

usersRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            surname: Joi.string().optional(),
            password: Joi.string().min(8).required(),
            email: Joi.string().required().email(),
            phone: Joi.string().required(),
            cpf: Joi.string().required(),
            indication_code: Joi.string().optional()
        },
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().optional(),
        }).options({ allowUnknown: true })
    }),
    usersControllers.create
);

usersRoutes.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().optional(),
            surname: Joi.string().optional(),
            email: Joi.string().email().optional(),
            phone: Joi.string().optional(),
            cpf: Joi.string().optional(),
            avatar: Joi.string().optional()
        },
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required(),
        }).options({ allowUnknown: true })
    }),
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER']),
    usersControllers.update
);

usersRoutes.put(
    '/password',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            new_password: Joi.string().min(8).required(),
            confirm_password: Joi.string().min(8).required(),
            recover_code: Joi.string().required(),
        },
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required(),
        }).options({ allowUnknown: true })
    }),
    usersControllers.recoverPassword
);

usersRoutes.put(
    '/recover-password',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().required().email()
        },
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required(),
        }).options({ allowUnknown: true })
    }),
    usersControllers.requestRecoverPassword
);

usersRoutes.get(
    '/indication-code',
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER', 'ROLE_ADMINISTRATOR']),
    celebrate({
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required(),
        }).options({ allowUnknown: true })
    }),
    usersControllers.indicationCode
)

usersRoutes.post(
    '/signin',
    celebrate({
        [Segments.BODY]: {
            phone: Joi.string().required(),
            password: Joi.string().required()
        },
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().optional(),
        }).options({ allowUnknown: true })
    }),
    sessionControllers.create
);

usersRoutes.post(
    '/permissions',
    authentication.verifyAcessTokenCompany,
    is(['ROLE_ADMINISTRATOR']),
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string().required(),
        },
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().optional(),
        }).options({ allowUnknown: true })
    }),
    permissionsControllers.create
);

usersRoutes.post(
    '/roles',
    authentication.verifyAcessTokenCompany,
    is(['ROLE_ADMINISTRATOR']),
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string().required(),
            permissions: Joi.array().items(Joi.string()).required()
        },
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().optional()
        }).options({ allowUnknown: true })
    }),
    rolesControllers.create
);

usersRoutes.get(
    '/tasks',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            x_token_api: Joi.string().required(),
        })
    }),
    authentication.verifyAcessTokenCompany,
    is(['ROLE_USER']),
    usersControllers.tasks
)

export default usersRoutes;