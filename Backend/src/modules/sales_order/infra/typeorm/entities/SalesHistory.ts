import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SalesHistory {
    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @Column()
    orderSaleId: string;

    @Column({ type: 'numeric', precision: 18, scale: 8, default: 0.00 })
    saleValue: number;

    @Column()
    typePayment: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
}