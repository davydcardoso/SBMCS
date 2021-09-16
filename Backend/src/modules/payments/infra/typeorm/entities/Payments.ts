import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Payments {

    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @Column()
    salesOrderId: string;

    @Column()
    statusPayment: string;

    @Column({type: 'numeric', precision: 18, scale: 8,  default: 0.00})
    value: string;

    @Column()
    dataPayment: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}