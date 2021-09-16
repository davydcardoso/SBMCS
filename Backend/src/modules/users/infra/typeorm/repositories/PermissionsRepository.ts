import { EntityRepository, Repository } from 'typeorm';

import { Permissions } from '@modules/users/infra/typeorm/entities/Permissions';

@EntityRepository(Permissions)
export default class PermissionsRepository extends Repository<Permissions> { }