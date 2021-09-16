import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Permissions {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    createAt: Date;

    @Column({nullable: true})
    updatedAt: Date;
}