import UserCaseInterface from "../../../@shared/domain/use-case/use-case-interface";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { FindOrderInputDto, FindOrderOutputDto } from "./find-order.dto";

export default class FindOrderUseCase implements UserCaseInterface {

    private _repository: CheckoutGateway;

    constructor(repository: CheckoutGateway) {
        this._repository = repository;
    }

    async execute(input: FindOrderInputDto): Promise<FindOrderOutputDto> {
        const order = await this._repository.findOrder(input.orderId);

        return {
            id: order.id.id,
            invoiceId: order.status === "approved" ? order.invoiceId : null,
            status: order.status,
            total: order.total,
            products: order.products.map((p) => {
                return {
                    productId: p.id.id,
                }
            }),
        }
    }

}