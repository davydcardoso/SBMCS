import { EntityRepository, Repository } from "typeorm";

import { IndicationCode } from "../entities/IndicationCode";

@EntityRepository(IndicationCode)
export default class IndicationCodeRepository extends Repository<IndicationCode>  {}