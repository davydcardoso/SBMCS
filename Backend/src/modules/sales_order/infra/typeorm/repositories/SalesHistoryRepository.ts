import { EntityRepository, Repository } from "typeorm";

import { SalesHistory } from "../entities/SalesHistory";

@EntityRepository(SalesHistory)
export default class SalesHistoryRepository extends Repository<SalesHistory> { }