import { getConnection } from 'typeorm';
import { v4 as GETUUID } from 'uuid';
import crypto from 'crypto';

import { IndicationCode } from '@modules/users/infra/typeorm/entities/IndicationCode';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import IndicationCodeRepository from '../infra/typeorm/repositories/IndicationCodeRepository';

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

export default class GetOrGenerateIndicationCodeServices {
    public async execute(data: ITokenDecoded): Promise<string> {

        const userRepository = getConnection('Postgres').getCustomRepository(UserRepository);
        const indicationCodeRepository = getConnection('Postgres').getCustomRepository(IndicationCodeRepository);

        const user = await userRepository.findOne({ id: data.payload.sub });
        const indicationCode = await indicationCodeRepository.findOne({ userId: user?.id })

        if (!user) {
            throw new Error('User not found');
        }

        if (indicationCode?.indicationCode) {
            return indicationCode?.indicationCode;
        }

        const createdIndicationCode =  crypto.randomBytes(10).toString('hex')

        await userRepository.update(data.payload.sub, {
            indicationCode: createdIndicationCode
        })

        // const newIndicationCode = indicationCodeRepository.create({
        //     id: GETUUID().toUpperCase(),
        //     userId: user.id,
        //     indicationCode: 
        // });

        // await indicationCodeRepository.save(newIndicationCode);

        return createdIndicationCode;
    }
}