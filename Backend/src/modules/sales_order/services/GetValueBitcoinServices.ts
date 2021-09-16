import axios, { AxiosResponse, AxiosError } from 'axios';

import { api_config } from '@config/api';

export default class GetValueBitcoinServices {
    public async execute(moeda: string): Promise<void> {
        
    }
}

/*const api = axios.create({ baseURL: api_config.plisio.apiUrl });
        let responseApi: AxiosResponse | AxiosError;
        await api.get(`/v1/currencies/${moeda}`).then( (response) => {
            responseApi = response;
        }).catch((err) => {
            responseApi = err;
        }).finally( () => {
            return responseApi;
        });*/