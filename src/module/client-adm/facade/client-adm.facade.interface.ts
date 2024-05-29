import UserCaseInterface from "../../@shared/domain/use-case/use-case-interface";
import Client from "../domain/client.entity";

export default interface ClientAdmFacadeInterface {
    addClient(input: AddClientFacadeInputDto): Promise<void>;
    findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}

export interface AddClientFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    address: string;
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
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}