import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SecutiryWallet {
    @PrimaryColumn()
    id: string;

    @Column()
    validate: string;

    @Column({ nullable: true })
    typeVerify: string;
}