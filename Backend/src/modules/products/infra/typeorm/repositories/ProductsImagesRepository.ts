import { EntityRepository, Repository } from 'typeorm';

import { ProductsImages } from '../entities/ProductsImages'; 

@EntityRepository(ProductsImages)
export default class ProductsImagesRepository extends Repository<ProductsImages> { }