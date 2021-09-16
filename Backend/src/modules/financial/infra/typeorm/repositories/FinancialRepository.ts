import { EntityRepository, Repository } from "typeorm";
import { Financial } from "../entities/Financial";

@EntityRepository(Financial)
export default class FinancialRepository extends Repository<Financial>{ }