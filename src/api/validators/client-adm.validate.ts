import Client from "../entity/client";

export default class ClientAdminValidate {
    static validate(client: Client): boolean {
        if (!client) {
            throw new Error("Client is required");
        }

        if (client.name.length === 0) {
            throw new Error("Name is required");
        }

        if (client.email.length === 0) {
            throw new Error("Email is required");
        }

        if (!client.address) {
            throw new Error("Address is required");
        }

        return true;
    }
}