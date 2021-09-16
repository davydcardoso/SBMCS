import { EntityRepository, Repository } from 'typeorm';

import { FormsPayments } from '../entities/FormsPayments'; 

@EntityRepository(FormsPayments)
export default class FormsPaymentsRepository extends Repository<FormsPayments> { }