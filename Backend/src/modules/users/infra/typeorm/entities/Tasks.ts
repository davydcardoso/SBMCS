import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Tasks {
    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @Column()
    packageId: string;

    @Column({ type: 'int' })
    tasksDone: number;

    @Column()
    referenceDay: Date;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

}