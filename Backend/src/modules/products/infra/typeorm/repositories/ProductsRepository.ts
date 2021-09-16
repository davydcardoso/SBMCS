import { EntityRepository, Repository } from 'typeorm';

import { Products } from '../entities/Products'; 

@EntityRepository(Products)
export default class ProductsRepository extends Repository<Products> { }