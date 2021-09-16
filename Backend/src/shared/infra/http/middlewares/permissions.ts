import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { getConnection } from "typeorm";

import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import { Users } from "@modules/users/infra/typeorm/entities/Users";
import { api_config } from "@config/api";

async function decoder(request: Request): Promise<Users | undefined> {
    const authHeader = request.headers.x_token_api as string;

    const userRepository = getConnection('Postgres').getCustomRepository(UserRepository);

    const payload = decode(authHeader);

    const user = await userRepository.findOne({ id: payload?.sub?.toString() }, { relations: ['roles'] });

    return user;
}

function is(role: String[]) {
    const roleAuthorized = async (request: Request, response: Response, next: NextFunction) => {
        const user = await decoder(request);

        const userRoles = user?.roles.map(role => role.name);

        const existsRoles = userRoles?.some(r => role.includes(r));

        if (existsRoles) {
            return next();
        }

        return response.status(401).json({ message: 'Not authorized!' });

    }

    return roleAuthorized;
}

export { is }