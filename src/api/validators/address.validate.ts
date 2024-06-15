import Address from "../@shared/value-object/address-value-object";

export default class AddressValidate {
    static validate(address: Address) {
        if (address.street.length === 0) {
            throw new Error("Street is required");
        }
        if (address.number.length === 0) {
            throw new Error("Number is required");
        }
        if (address.complement.length === 0) {
            throw new Error("Complement is required");
        }
        if (address.city.length === 0) {
            throw new Error("City is required");
        }
        if (address.state.length === 0) {
            throw new Error("State is required");
        }
        if (address.zipCode.length === 0) {
            throw new Error("ZipCode is required");
        }
    }
}