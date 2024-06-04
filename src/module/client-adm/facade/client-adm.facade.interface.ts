
export default interface ClientAdmFacadeInterface {
    addClient(input: AddClientFacadeInputDto): Promise<void>;
    findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}

export interface AddClientFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    document: string;
    street: string;
    city: string;
    complement: string;
    number: string;
    state: string;
    zipCode: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FindClientFacadeInputDto {
    clientId: string;
}

export interface FindClientFacadeOutputDto {
    id?: string;
    name: string;
    email: string;
    document: string;
    street: string;
    city: string;
    complement: string;
    number: string;
    state: string;
    zipCode: string;
    createdAt?: Date;
    updatedAt?: Date;
}