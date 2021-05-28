import { TipoEndereco } from "../enums/tipo-endereco.enum";

export interface Address {
    id: string,
    description: string,
    zipCode: string,
    type: TipoEndereco,
    street: string,
    number: number,
    neighborhood: string,
    city: string,
    state: string
}
