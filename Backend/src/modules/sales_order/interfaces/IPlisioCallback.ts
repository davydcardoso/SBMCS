export interface IPlisioCallback {
    txn_id: string;
    ipn_type: string;
    merchant: string;
    merchant_id: string;
    amount: number;
    currency: string;
    order_number: number;
    order_name: string;
    confirmations: number;
    status: string
    source_currency: string;
    source_amount: number;
    source_rate: number;
    invoice_commission: number;
    invoice_total_sum: number;
    invoice_total: number;
    comment: string;
    verify_hash: string;
    psys_cid: string;
    pending_amount: number;
    tx_urls: [string];
}