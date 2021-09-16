import { EntityRepository, Repository } from "typeorm";
import { SalesOrders } from "../entities/SalesOrders";

@EntityRepository(SalesOrders)
export default class SalesOrderRepository extends Repository<SalesOrders> {}