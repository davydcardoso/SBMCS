import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { api_config } from '@config/api';

interface ITokenDecoded {
    header: {
        alg: string;
        typ: string;
    },
    payload: {
        iat: number;
        exp: number;
        sub: string;
    },
    signature: string;
}

export default class Authentication {
    public async generationTokenCompany(data: any): Promise<string> {
        return jwt.sign(data, api_config.auth.key, { expiresIn: api_config.ambient == 'sandbox' ? '1d' : '1h' })
    }

    public async verifyAcessTokenCompany(request: Request, response: Response, next: NextFunction): Promise<any> {
        const token_user = request.headers.x_token_api as string;
        jwt.verify(token_user, api_config.auth.key, (err) => {
            if (err) {
                return response.status(401).json({ message: 'Expired Token' })
            }
            next();
        })
    }

    public decodToken(token: string): ITokenDecoded {
        return jwt.decode(token, { complete: true }) as ITokenDecoded;
    }
}