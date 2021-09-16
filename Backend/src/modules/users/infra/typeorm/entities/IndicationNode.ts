import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

import { Users } from "./Users";

@Entity()
export class IndicationNode {

    @PrimaryColumn('uuid')
    id: string;
    
    @Column()
    indicator: string;

    @Column()
    userId: string;


    // @ManyToMany(() => Users, user => user.indicationNode)
    // user: Users[]

}