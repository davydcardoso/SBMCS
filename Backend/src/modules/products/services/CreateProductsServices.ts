import { IProductData } from "../interfaces/IProductData";

export default class CreateProductsServices {
    public async execute(data: IProductData): Promise<IProductData|null> {
        return data;
    }
}