import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Wallets {
    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @Column({ type: 'real', default: 0 })
    moneyValue: number;

    @Column({ nullable: true })
    pixKey: string;

    @Column({ nullable: true })
    blockchainKey: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
}