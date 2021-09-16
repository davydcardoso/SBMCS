import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class FormsPayments {

    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    type: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

}