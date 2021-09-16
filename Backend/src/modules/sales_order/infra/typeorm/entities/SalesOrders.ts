import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SalesOrders {

    @PrimaryColumn()
    id: string;

    @Column({nullable: false})
    userId: string;

    @Column()
    plisioInvoiceId: string;

    @Column()
    plisioInvoiceUrl: string;

    @Column({ type: 'numeric', precision: 18, scale: 4, default: 0.00 })
    value: number;

    @Column({ type: 'numeric', precision: 18, scale: 8, default: 0.00 })
    virtualCurrencyValue: number;

    @Column({ default: 'BRL' })
    saleType: string;

    @Column({ type: 'int' })
    statusPayment: number;

    @Column()
    registerDate: Date;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

}