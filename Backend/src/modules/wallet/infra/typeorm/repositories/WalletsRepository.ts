import { EntityRepository, Repository } from "typeorm";

import { Wallets } from "../entities/Wallets";

@EntityRepository(Wallets)
export default class WalletsRepository extends Repository<Wallets> {}