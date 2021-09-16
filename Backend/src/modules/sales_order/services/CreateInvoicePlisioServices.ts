import { v4 as GETUUID } from 'uuid';
import axios, { AxiosError, AxiosInstance } from 'axios';

import { api_config } from '@config/api';
import { IResponsePlisio } from '../interfaces/IResponsePlisio';

export default class CreateInvoicePlisioServices {
    public async execute(api: AxiosInstance, orderNumber: number, orderName: string, productValueInBitcoin: number): Promise<IResponsePlisio> {
        const returnPlisio = await api.get(
            '/v1/invoices/new',
            {
                params: {
                    api_key: api_config.plisio.secretKey,
                    source_currency: 'USD',
                    currency: 'BTC',
                    order_number: orderNumber,
                    order_name: orderName,
                    amount: productValueInBitcoin,
                    callback_url: api_config.urlBaseApi
                }
            }
        );
        return returnPlisio.data.data as IResponsePlisio;
    }
}