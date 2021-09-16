import { EntityRepository, Repository } from "typeorm";
import { UserPackages } from "../entities/UserPackages";

@EntityRepository(UserPackages)
export default class UserPackagesRepository extends Repository<UserPackages> {}