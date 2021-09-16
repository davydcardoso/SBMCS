import { Response } from "express";
import { getConnection } from "typeorm";

import { Products } from "../infra/typeorm/entities/Products";
import { ProductsImages } from "../infra/typeorm/entities/ProductsImages";
import ProductsImagesRepository from "../infra/typeorm/repositories/ProductsImagesRepository";
import ProductsRepository from "../infra/typeorm/repositories/ProductsRepository";

interface IProductsArray {
    id: string;
    description: string;
    value: string;
    images: [
        {
            id: string;
            link: string;
        }
    ]
}

export default class GetAllProductsServices {
    public async execute(): Promise<Products[] | null> {

        const productRepository = getConnection('Postgres').getCustomRepository(ProductsRepository);
        // const imagesRepository = getConnection('Postgres').getCustomRepository(ProductsImagesRepository);

        const products = await productRepository.find({});

        return products;
    }
}