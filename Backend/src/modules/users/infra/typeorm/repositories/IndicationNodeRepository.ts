import { EntityRepository, Repository } from "typeorm";

import { IndicationNode } from "../entities/IndicationNode";

@EntityRepository(IndicationNode)
export default class IndicationNodeRepository extends Repository<IndicationNode> {}