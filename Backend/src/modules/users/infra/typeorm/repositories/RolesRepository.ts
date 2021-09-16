import { EntityRepository, Repository } from 'typeorm';

import { Roles } from '@modules/users/infra/typeorm/entities/Roles';

@EntityRepository(Roles)
export default class RolesRepository extends Repository<Roles> { }