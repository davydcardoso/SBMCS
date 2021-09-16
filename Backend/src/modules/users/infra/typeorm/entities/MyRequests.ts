import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class MyRequests {

    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @Column({ default: 1 })
    status: number;

    @Column()
    invoicePlisioCode: string;

    @Column({ type: 'numeric', precision: 18, scale: 4 })
    value: number;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

}