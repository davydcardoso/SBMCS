import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Financial {
    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @Column({ type: 'int', default: 0 })
    status: number;

    @Column()
    type: string;

    @Column({ type: 'numeric', precision: 18, scale: 4 })
    value: number;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

}