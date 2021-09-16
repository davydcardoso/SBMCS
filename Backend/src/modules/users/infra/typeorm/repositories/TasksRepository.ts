import { EntityRepository, Repository } from "typeorm";
import { Tasks } from "../entities/Tasks";

@EntityRepository(Tasks)
export default class TasksRepository extends Repository<Tasks> { }