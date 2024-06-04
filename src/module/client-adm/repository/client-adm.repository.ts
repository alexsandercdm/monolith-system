import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client-gateway";
import ClientModel from "./client-adm.model";

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.address.street,
            city: client.address.city,
            complement: client.address.complement,
            number: client.address.number,
            state: client.address.state,
            zipCode: client.address.zipCode,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async find(id: string): Promise<Client> {
        const client = await ClientModel.findOne({ where: { id } });

        return new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            document: client.document,
            address: new Address({
                city: client.city,
                complement: client.complement,
                number: client.number,
                state: client.state,
                street: client.street,
                zipCode: client.zipCode,
            }),
        });
    }

}