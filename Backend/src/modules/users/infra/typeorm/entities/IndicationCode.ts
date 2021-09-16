import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class IndicationCode {

    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;


    @Column()
    indicationCode: string;

}