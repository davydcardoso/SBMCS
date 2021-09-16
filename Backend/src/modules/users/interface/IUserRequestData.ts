export interface IUserRequestData {
    id?: string;
    name: string;
    surname?: string;
    password: string;
    email: string;
    cpf: string;
    type: string;
    phone: string;
    avatar?:string;
    pix_key?:string;
    bitcoin_wallet?: string;
    indication_code?: string;
    // roles: [];
}