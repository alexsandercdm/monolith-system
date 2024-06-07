export interface FindOrderInputDto {
    orderId: string;
}

export interface FindOrderOutputDto {
    id: string;
    invoiceId: string;
    status: string;
    total: number;
    products: {
        productId: string;
    }[];
}