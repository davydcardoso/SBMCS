import { Response, Request, NextFunction } from "express";

import GetAllProductsServices from "@modules/products/services/GetAllProductsServices";
import GetOneProductsServices from "@modules/products/services/GetOneProductsServices";

export default class ProductsControllers {
    public async getAllProducts(request: Request, response: Response): Promise<Response> {
        try {
            const getAllProductsServices = new GetAllProductsServices;

            const products = await getAllProductsServices.execute();

            return response.status(200).json({ products })

        } catch (err: any) {
            return response.status(400).json({ message: err.message })
        }
    }

    public async getOne(request: Request, response: Response): Promise<Response> {
        try {
            const getOneProductsServices = new GetOneProductsServices;

            const { id } = request.params;

            const product = await getOneProductsServices.execute(id);

            return response.status(200).json({ product })
        } catch (err: any) {
            return response.status(400).json({ message: err.message })
        }
    }

    public async create(request: Request, response: Response): Promise<Response> {
        try {

            return response.json();
        } catch (err: any) {
            return response.status(400).json({ message: err.message });
        }
    }
}