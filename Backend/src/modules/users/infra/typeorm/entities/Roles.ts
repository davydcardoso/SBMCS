import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

import { Permissions } from "./Permissions";

@Entity()
export class Roles {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    createAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @ManyToMany(() => Permissions)
    @JoinTable({
        name: 'permissions_roles',
        joinColumns: [{ name: 'role_id' }],
        inverseJoinColumns: [{ name: 'permission_id' }]
    })
    permission: Permissions[]
}