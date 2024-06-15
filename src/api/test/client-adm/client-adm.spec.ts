import Client from "../../entity/client";
import Address from "../../@shared/value-object/address-value-object";

describe("Client adm tests", () => {
    
    it("Should validate a client-adm", async () => {
        const client = new Client({
            name: "Client 1",
            email: "Email 1",
            document: "000",
            address: new Address({
                street: "Street 1",
                number: "Number 1",
                complement: "Complement 1",
                state: "State 1",
                city: "City 1",
                zipCode: "000",
            }),
        });

       expect(client).toBeDefined();
    });

    it("Should validate a client-adm fields empty", async () => {

       expect( () =>
        new Client({
            name: "",
            email: "Email 1",
            document: "000",
            address: new Address({
                street: "Street 1",
                number: "Number 1",
                complement: "Complement 1",
                state: "State 1",
                city: "City 1",
                zipCode: "000",
            })})
       ).toThrow(new Error("Name is required"));

       expect( () =>
        new Client({
            name: "Name",
            email: "",
            document: "000",
            address: new Address({
                street: "Street 1",
                number: "Number 1",
                complement: "Complement 1",
                state: "State 1",
                city: "City 1",
                zipCode: "000",
            })})
       ).toThrow(new Error("Email is required"));
       
       expect( () =>
        new Client({
            name: "Client 1",
            email: "Email 1",
            document: "000",
            address: new Address({
                street: "",
                number: "Number 1",
                complement: "Complement 1",
                state: "State 1",
                city: "City 1",
                zipCode: "000",
            })})
       ).toThrow(new Error("Street is required"));

       expect( () =>
        new Client({
            name: "Client 1",
            email: "Email 1",
            document: "000",
            address: new Address({
                street: "Street 1",
                number: "",
                complement: "Complement 1",
                state: "State 1",
                city: "City 1",
                zipCode: "000",
            })})
       ).toThrow(new Error("Number is required"));

       expect( () =>
        new Client({
            name: "Client 1",
            email: "Email 1",
            document: "000",
            address: new Address({
                street: "Street",
                number: "Number 1",
                complement: "",
                state: "State 1",
                city: "City 1",
                zipCode: "000",
            })})
       ).toThrow(new Error("Complement is required"));

       expect( () =>
        new Client({
            name: "Client 1",
            email: "Email 1",
            document: "000",
            address: new Address({
                street: "Street 1",
                number: "Number 1",
                complement: "Complement 1",
                state: "",
                city: "City 1",
                zipCode: "000",
            })})
       ).toThrow(new Error("State is required"));

       expect( () =>
        new Client({
            name: "Client 1",
            email: "Email 1",
            document: "000",
            address: new Address({
                street: "Street 1",
                number: "Number 1",
                complement: "Complement 1",
                state: "State 1",
                city: "",
                zipCode: "000",
            })})
       ).toThrow(new Error("City is required"));

       expect( () =>
        new Client({
            name: "Client 1",
            email: "Email 1",
            document: "000",
            address: new Address({
                street: "Street 1",
                number: "Number 1",
                complement: "Complement 1",
                state: "State 1",
                city: "City 1",
                zipCode: "",
            })})
       ).toThrow(new Error("ZipCode is required"));

    });

});
