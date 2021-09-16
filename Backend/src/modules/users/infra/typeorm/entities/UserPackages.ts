import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserPackages {
    @PrimaryColumn()
    id: string;
}