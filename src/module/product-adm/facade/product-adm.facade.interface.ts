export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProducFacadeInputDto) :Promise<void>;
    checkStock(input: CheckStockFacedeInputDto): Promise<CheckStockFacedeOutputDto>;
    updateStock(input: UpdateStockProductFacadeInputDto): Promise<UpdateStockProductFacadeOutputDto>;
}

export interface AddProducFacadeInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface CheckStockFacedeInputDto {
    productId: string;
}

export interface CheckStockFacedeOutputDto {
    productId: string;
    stock: number;
}

export interface UpdateStockProductFacadeInputDto{
    productId: string;
    stock: number;
}

export interface UpdateStockProductFacadeOutputDto {
    status: boolean;
}