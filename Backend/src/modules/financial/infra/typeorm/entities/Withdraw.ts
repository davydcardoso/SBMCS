import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Withdraw {
    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @Column({ type: 'int' })
    status: number;

    @Column({ type: 'real' })
    valueWithdraw: number;

    @Column()
    typeWithdraw: string;

    @Column()
    keyWallet: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

}