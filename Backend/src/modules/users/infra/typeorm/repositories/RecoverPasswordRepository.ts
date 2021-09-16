import { EntityRepository, Repository } from 'typeorm';

import { RecoverPassword } from '../entities/RecoverPassword'; 

@EntityRepository(RecoverPassword)
export default class RolesRepository extends Repository<RecoverPassword> { }