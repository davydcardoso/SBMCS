import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Products } from "./Products";

@Entity()
export class ProductsImages {

    @PrimaryColumn()
    id: string;

    // @Column()
    // productsId: string;

    @ManyToOne(() => Products, products => products.images)
    @JoinTable()
    products: Products;

    @Column({length: 9999, nullable: true})
    contents: string;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    updatedAd: Date;

}