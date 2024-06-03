import ValueObject from "./value-object.interface";

type AddressProps = {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export default class Address implements ValueObject {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(address: AddressProps) {
        this._street = address.street;
        this._number = address.number;
        this._complement = address.complement;
        this._city = address.city;
        this._state = address.state;
        this._zipCode = address.zipCode;
    }


    
    get street(): string {
        return this._street;
    }
    
    get number(): string {
        return this._number;
    }
    
    get complement(): string {
        return this._complement;
    }
    
    get city(): string {
        return this._city;
    }
    
    get state(): string {
        return this._state;
    }
    
    get zipCode(): string {
        return this._zipCode;
    }

}