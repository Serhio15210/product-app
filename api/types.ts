export type Product = {
    uuid: string;
    name: string;
    price: number;
    description?: string;
    photo?: string;
    bought?: boolean;
};