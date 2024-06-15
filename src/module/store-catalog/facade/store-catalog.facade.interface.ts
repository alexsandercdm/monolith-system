export interface FindStoreCatalogFacadeInputDto {
    id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}

export interface AddProductStoreCatalogFacadeInputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number
}

export interface AddProductStoreCatalogFacadeOutputDto {
    id: string;
}



export default interface StoreCatalogFacadeInterface {
    add(input: AddProductStoreCatalogFacadeInputDto): Promise<AddProductStoreCatalogFacadeOutputDto>;
    find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}