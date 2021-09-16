import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { IndicationNode } from "./IndicationNode";

import { Roles } from "./Roles";

@Entity()
export class Users {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    surname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    cpf: string;

    @Column({ nullable: true, length: 999999 })
    avatar: string;

    @Column({ nullable: true })
    pix_key: string;

    @Column({ nullable: true })
    bitcoin_wallet: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    indicationCode: string;

    @Column()
    createAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @ManyToMany(() => Roles)
    @JoinTable({
        name: 'users_roles',
        joinColumns: [{ name: 'role_id' }],
        inverseJoinColumns: [{ name: 'user_id' }]
    })
    roles: Roles[]

    // @ManyToMany(() => IndicationNode, indicationNode => indicationNode.user)
    // indicationNode: IndicationNode[]

}