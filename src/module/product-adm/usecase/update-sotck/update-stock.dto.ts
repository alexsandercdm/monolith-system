export interface UpdateStockProductInputDto{
    productId: string;
    stock: number;
}

export interface UpdateStockProductOutputDto {
    status: boolean;
}