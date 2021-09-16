import axios, { AxiosError } from 'axios';
import { QueryRunner } from 'typeorm';

import { FormsPayments } from "@modules/payments/infra/typeorm/entities/FormsPayments";
import { Products } from "@modules/products/infra/typeorm/entities/Products";
import { SalesOrders } from "../infra/typeorm/entities/SalesOrders";
import { api_config } from "@config/api";
import { IVirtualCoinsData } from '@modules/sales_order/interfaces/IVirtualCoinsData'
import { IMoneyCoins } from "../interfaces/IMoneyCoins";
import GetWalletsUserServices from "@modules/wallet/services/GetWalletUserServices";
import SaveOrderSaleServices from './SaveOrderSaleServices';
import CreateInvoicePlisioServices from './CreateInvoicePlisioServices';
import SaveSalesHistoryServices from './SaveSalesHistoryServices';
import RecordsUsersWalletMovementServices from '@modules/wallet/services/RecordsUsersWalletMovementServices';
import SaveUserRequestService from './SaveUserRequestService';
import { generateRandomCodeNumber } from 'global/FunctionsGlobal';
import CreateMyRequestServices from '@modules/users/services/CreateMyRequestServices';
import { stPending } from 'global/statusOrderSalesGlobal';


export default class CreateOrderSalesServices {

    constructor(
        private transaction: QueryRunner
    ) { }

    public async execute(product: Products, payment: FormsPayments, userId: string): Promise<SalesOrders | null> {
        const saveOrderSaleServices = new SaveOrderSaleServices(this.transaction);
        const createInvoicePlisioServices = new CreateInvoicePlisioServices;
        const saveSalesHistoryServices = new SaveSalesHistoryServices(this.transaction);
        const saveUserRequestService = new SaveUserRequestService(this.transaction);
        const createMyRequestServices = new CreateMyRequestServices(this.transaction);

        const apiVirtualCoins = axios.create({ baseURL: api_config.plisio.apiUrl });
        const responseVirtualCoins = await apiVirtualCoins.get('/v1/currencies/BRL');
        const apiCoins = axios.create({ baseURL: api_config.awesomeapi.url });
        const responseCoins = await apiCoins.get('/USD-BRL/1');
        const apiInvoicePlisio = axios.create({ baseURL: api_config.plisio.apiUrl });

        let vitualCoinsDetail;
        let bitcoinValue: number = 0;
        let ethereumValue: number = 0;

        const invoiceCode = generateRandomCodeNumber();

        switch (payment.type) {
            case 'BTC':
                for (let c = 0; c < responseVirtualCoins.data.data.length; c++) {
                    vitualCoinsDetail = responseVirtualCoins.data.data[c] as IVirtualCoinsData;
                    if (vitualCoinsDetail.cid == "BTC")
                        bitcoinValue = vitualCoinsDetail.rate_usd;
                }

                bitcoinValue = parseFloat(Number(bitcoinValue).toFixed(8));

                const productValueInBitcoin = parseFloat(Number(product.value * bitcoinValue).toFixed(8)); // R$: Produto > bitcoin USD

                const plisioBTC = await createInvoicePlisioServices.execute(apiInvoicePlisio, invoiceCode, `Product: ${product.description}`, productValueInBitcoin);

                const createdSaleForBitcoin = await saveOrderSaleServices.execute(plisioBTC.txn_id, plisioBTC.invoice_url, product.value, bitcoinValue, userId, 'BTC');
                await saveSalesHistoryServices.execute(userId, createdSaleForBitcoin.value, createdSaleForBitcoin.saleType, createdSaleForBitcoin.id);
                await saveUserRequestService.execute(plisioBTC, createdSaleForBitcoin);
                await createMyRequestServices.execute({ userId: userId, invoicePlisioCode: plisioBTC.txn_id, value: product.value })

                return createdSaleForBitcoin;
            case 'PIX':

                return null;
            case 'ETH':
                for (let c = 0; c < responseVirtualCoins.data.data.length; c++) {
                    vitualCoinsDetail = responseVirtualCoins.data.data[c] as IVirtualCoinsData;
                    if (vitualCoinsDetail.cid == "ETH")
                        bitcoinValue = vitualCoinsDetail.rate_usd;
                }

                ethereumValue = parseFloat(Number(ethereumValue).toFixed(8));

                const productValueInEthereum = parseFloat(Number(product.value * ethereumValue).toFixed(8)); // R$: Produto > bitcoin USD

                const plisioETH = await createInvoicePlisioServices.execute(apiInvoicePlisio, invoiceCode, `Product: ${product.description}`, productValueInEthereum);

                const createdSaleEthereum = await saveOrderSaleServices.execute(plisioETH.txn_id, plisioETH.invoice_url, product.value, ethereumValue, userId, 'BTC');
                await saveSalesHistoryServices.execute(userId, createdSaleEthereum.value, createdSaleEthereum.saleType, createdSaleEthereum.id);

                return createdSaleEthereum;
            default:
                throw new Error('Payment method is not valid');
        }
    }
}