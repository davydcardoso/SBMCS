import { Entity, EntityRepository, Repository } from "typeorm";
import { MyRequests } from "../entities/MyRequests";


@EntityRepository(MyRequests)
export default class MyRequestsRepository extends Repository<MyRequests> { }