export interface CheckStockProductInputDto {
    productId: string;
}

export interface CheckStockProductOutputDto {
    productId: string;
    stock: number;
}