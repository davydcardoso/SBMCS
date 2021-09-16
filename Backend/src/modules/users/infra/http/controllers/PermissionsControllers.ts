import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import PermissionsRepository from '@modules/users/infra/typeorm/repositories/PermissionsRepository';;


export default class PermissionsControllers {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const permissionsRepository = getConnection('Postgres').getCustomRepository(PermissionsRepository)

            const { name, description } = request.body;

            const existPermission = await permissionsRepository.findOne({ name });

            if (existPermission) {
                return response.status(400).json({ error: 'Permissao ja existe' });
            }

            const permission = permissionsRepository.create({
                id: GETUUID().toUpperCase(),
                name: name,
                description: description,
                createAt: new Date(),
            });

            await permissionsRepository.save(permission);

            return response.status(201).json(permission);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}