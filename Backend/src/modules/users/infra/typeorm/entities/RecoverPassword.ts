import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RecoverPassword {

    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @Column()
    codeRecover: string;

    @Column({type: 'timestamp'})
    expiredTime: Date;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

}