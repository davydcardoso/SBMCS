import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

import { ProductsImages } from "./ProductsImages";

@Entity({ name: 'products' })
export class Products {

    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @Column({ type: 'float' })
    value: number;

    @Column({type: 'int', default: 0})
    numberOfTasks: number;

    @Column({type: 'numeric', precision: 18, scale: 4,  default: 0.00})
    EarningsPerTask: number;

    @Column({type: 'numeric', precision: 18, scale: 4,  default: 0.00})
    totalGainDay: number;

    @Column({type: 'numeric', precision: 18, scale: 4,  default: 0.00})
    GainCeiling: number;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    // @ManyToMany(() => ProductsImages, ProductsImages => ProductsImages.products)
    // @ManyToMany(() => ProductsImages)
    // @JoinTable({
    //     name: 'images_products',
    //     joinColumns: [{ name: 'productsId' }],
    //     inverseJoinColumns: [{ name: 'imagesId' }]
    // })

    @ManyToMany(() => ProductsImages, ProductsImages => ProductsImages.products)
    images: ProductsImages[]

}

// @ManyToMany(() => Roles)
// @JoinTable({
//     name: 'users_roles',
//     joinColumns: [{ name: 'role_id' }],
//     inverseJoinColumns: [{ name: 'user_id' }]
// })
// roles: Roles[]