import { Request, Response, NextFunction } from 'express';
import { getConnection, getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { api_config } from '@config/api';

import UserRepository from '../../typeorm/repositories/UserRepository';

export default class SessionControllers {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { phone, password } = request.body;

            const userRepository = getConnection('Postgres').getCustomRepository(UserRepository);

            const user = await userRepository.findOne({ phone });

            if (!user) {
                return response.status(400).json({ error: 'Usuario nao existe' });
            }

            const matchPassword = await compare(password, user.password);

            if (!matchPassword) {
                return response.status(401).json({ error: 'Usuario ou senha incorretos' });
            }

            const tokenUser = sign({}, api_config.auth.key, {
                subject: user.id,
                expiresIn: '1d'
            });

            //@ts-ignore
            delete user.password;

            //@ts-ignore
            delete user.avatar;

            return response.status(200).json(
                {
                    token: tokenUser,
                    data: user
                }
            )
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}