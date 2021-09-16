import { EntityRepository, Repository } from 'typeorm';

import { Users } from '@modules/users/infra/typeorm/entities/Users';

@EntityRepository(Users)
export default class UserRepository extends Repository<Users> { }