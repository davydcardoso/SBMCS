import { EntityRepository, Repository } from "typeorm";

import { Withdraw } from "../entities/Withdraw";

@EntityRepository(Withdraw)
export default class WithdrawRepository extends Repository<Withdraw> { }