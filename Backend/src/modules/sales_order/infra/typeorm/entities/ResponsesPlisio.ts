import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class ResponsesPlisio {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: true })
    txn_id: string;

    @Column({ nullable: true })
    ipn_type: string;

    @Column({ nullable: true })
    merchant: string;

    @Column({ nullable: true })
    merchant_id: string;

    @Column({ nullable: true })
    amount: number;

    @Column({ nullable: true })
    currency: string;

    @Column({ nullable: true })
    order_number: number;

    @Column({ nullable: true })
    order_name: string;

    @Column({ nullable: true })
    confirmations: number;

    @Column({ nullable: true })
    status: string

    @Column({ nullable: true })
    source_currency: string;

    @Column({ nullable: true })
    source_amount: number;

    @Column({ nullable: true })
    source_rate: number;

    @Column({ nullable: true })
    invoice_commission: number;

    @Column({ nullable: true })
    invoice_total_sum: number;

    @Column({ nullable: true })
    invoice_total: number;

    @Column({ nullable: true })
    comment: string;

    @Column({ nullable: true })
    verify_hash: string;

    @Column({ nullable: true })
    psys_cid: string;

    @Column({ nullable: true })
    pending_amount: number;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
}