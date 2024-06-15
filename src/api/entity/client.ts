import Address from "../@shared/value-object/address-value-object";
import ClientAdminValidate from "../validators/client-adm.validate";

type ClientProps = {
    id?: string;
    name: string;
    email: string;
    document: string;
    address: Address;
    createdAt?: Date;
    updatedAt?: Date;
};

export default class Client {
    private _id?: string;
    private _name: string;
    private _email: string;
    private _document: string;
    private _address: Address;
    private _createdAt?: Date;
    private _updatedAt?: Date;

    constructor(props: ClientProps) {
        this._id = props.id;
        this._name = props.name;
        this._email = props.email;
        this._document = props.document;
        this._address = props.address;
        this._createdAt = props.createdAt;
        this._updatedAt = props.updatedAt;
        ClientAdminValidate.validate(this);
    }; 

    get id(): string{
        return this._id;
    };

    get name(): string {
        return this._name;
    }; 

    get email(): string {
        return this._email;
    };

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

}