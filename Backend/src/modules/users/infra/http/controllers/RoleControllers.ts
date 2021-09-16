import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { v4 as GETUUID } from 'uuid';

import RoleRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';
import PermissionsRepository from '@modules/users/infra/typeorm/repositories/PermissionsRepository';


export default class RolesControllers {
    public async create(request: Request, response: Response): Promise<Response> {

        try {
            const rolesRepository = getConnection('Postgres').getCustomRepository(RoleRepository)
            const permissionsRepository = getConnection('Postgres').getCustomRepository(PermissionsRepository)

            const { name, description, permissions } = request.body;

            const existRole = await rolesRepository.findOne({ name });

            if (existRole) {
                return response.status(400).json({ error: 'Funcao ja existe' });
            }

            const existPermissions = await permissionsRepository.findByIds(permissions);

            const roles = rolesRepository.create({
                id: GETUUID().toUpperCase(),
                name: name,
                description: description,
                permission: existPermissions,
                createAt: new Date(),
            });

            await rolesRepository.save(roles);

            return response.status(201).json({ roles });
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}