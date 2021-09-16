export interface IVirtualCoinsData {
    name: string;
    cid: string;
    currency: string;
    icon: string;
    rate_usd: number;
    price_usd: number;
    precision: string;
    fiat: string;
    fiat_rate: number;
    min_sum_in: number;
    invoice_commission_percentage: number;
    hidden: number;
    maintenance: boolean;
}