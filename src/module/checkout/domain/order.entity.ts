import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object"
import Client from "./client.entity";
import Product from "./product.entity";

type OrderProps = {
    id?: Id;
    invoiceId?: string;
    client: Client;
    products: Product[];
    status?: string;
}

export default class Order extends BaseEntity {
    private _client: Client;
    private _invoiceId?: string;
    private _product: Product[];
    private _status: string;

    constructor(props: OrderProps) {
        super(props.id);
        this._client = props.client;
        this._invoiceId = props.invoiceId;
        this._product = props.products;
        this._status = props.status || "pending";
    }

    approved(): void {
        this._status = "approved"
    }

    get client(): Client {
        return this._client;
    }

    get products(): Product[] {
        return this._product;
    }

    get status(): string {
        return this._status;
    }

    get invoiceId(): string {
        return this._invoiceId;
    }

    set setInvoiceId(id: string) {
        this._invoiceId = id;
    }

    get total(): number {
        return this._product.reduce((total, product) => {
            return total + product.salesPrices;
        }, 0);
    }
}