import { Request, Response } from "express";
import { getConnection, getConnectionOptions } from "typeorm";

import ProductsRepository from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import FormsPaymentsRepository from "@modules/payments/infra/typeorm/repositories/FormsPaymentsServices";
import CreateOrderSalesServices from "@modules/sales_order/services/CreateOrderSalesServices";
import Authentication from "@shared/infra/http/middlewares/Authentication";
import FetchMySalesOrdersServices from "@modules/sales_order/services/FetchMySalesOrdersServices";

export default class SalesOrdersControllers {
    public async create(request: Request, response: Response): Promise<Response> {
        const transaction = getConnection('Postgres').createQueryRunner();

        await transaction.connect();

        await transaction.startTransaction();
        try {
            const createOrderSalesServices = new CreateOrderSalesServices(transaction);
            const authentication = new Authentication;

            const productRepository = transaction.manager.getCustomRepository(ProductsRepository);
            const formsPaymentsRepository = transaction.manager.getCustomRepository(FormsPaymentsRepository);

            const { products, payment } = request.body;

            const tokenDecoded = authentication.decodToken(request.headers.x_token_api as string);

            const product = await productRepository.findOne({ id: products });
            const formPayment = await formsPaymentsRepository.findOne({ id: payment });

            if (!product) {
                return response.status(400).json({ message: 'Product not found' });
            }

            if (!formPayment) {
                return response.status(400).json({ message: 'Payment method not found' });
            }

            const orderSales = await createOrderSalesServices.execute(product, formPayment, tokenDecoded.payload.sub);

            await transaction.commitTransaction();

            return response.status(201).json({ orderSales });
        } catch (err: any) {
            await transaction.rollbackTransaction();
            return response.status(400).json({ message: err.message });
        } finally {
            await transaction.release();
        }
    }

    public async myRequest(request: Request, response: Response): Promise<Response> {
        try {
            const fetchMySalesOrdersServices = new FetchMySalesOrdersServices;
            const authentication = new Authentication;

            const { x_token_api } = request.headers;

            const tokenDecoded = authentication.decodToken(x_token_api as string);

            const sales = await fetchMySalesOrdersServices.execute(tokenDecoded.payload.sub);

            return response.json({ sales });
        } catch (err: any) {
            return response.status(400).json({ message: err.message });
        }
    }
}