import { Request, Response } from "express";
import { getConnection } from "typeorm";

import GetAllPaymentsServices from "@modules/payments/services/GetAllFormsOfPaymentsServices";
import ProcessUserPaymentServices from "@modules/sales_order/services/ProcessUserPaymentServices";
import { IPlisioCallback } from "@modules/sales_order/interfaces/IPlisioCallback";
import Authentication from "@shared/infra/http/middlewares/Authentication";

export default class PaymentsControllers {
    public async getAll(request: Request, response: Response): Promise<Response> {
        try {
            const getAllPaymentsServices = new GetAllPaymentsServices;

            const payments = await getAllPaymentsServices.execute();

            return response.status(200).json({ payments });
        } catch (err: any) {
            return response.status(400).json({ message: err.message })
        }
    }

    public async paymentConfirmation(request: Request, response: Response): Promise<Response> {
        const transaction = getConnection('Postgres').createQueryRunner();

        await transaction.connect();

        await transaction.startTransaction();
        try {
            const processUserPaymentServices = new ProcessUserPaymentServices(transaction);

            const callbackPlisio = request.body.data as IPlisioCallback;
            const statusPayment = request.body.status as string;

            const paymentProcessed = await processUserPaymentServices.execute(statusPayment, callbackPlisio);

            await transaction.commitTransaction();
            return response.status(201).json({ paymentProcessed })
        } catch (err: any) {
            await transaction.rollbackTransaction();
            return response.status(400).json({ message: err.message });
        } finally {
            await transaction.release();
        }
    }

    public async create(request: Request, response: Response): Promise<Response> {

        return response.json();
    }
}