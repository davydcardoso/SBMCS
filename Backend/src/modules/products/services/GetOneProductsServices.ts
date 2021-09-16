import { getConnection } from "typeorm";

import { Products } from "../infra/typeorm/entities/Products";
import ProductsRepository from "../infra/typeorm/repositories/ProductsRepository";

export default class GetOneProductsServices {
    public async execute(id: string): Promise<Products | undefined> {
     
        const productsRepository = getConnection('Postgres').getCustomRepository(ProductsRepository);

        const products = await productsRepository.findOne(id)

        return products;

    }
}