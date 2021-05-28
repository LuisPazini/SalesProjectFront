import { Address } from "./address";
import { Contact } from "./contact";

export interface Customer {
    id: string,
    cnpj: string,
    companyName: string,
    email: string,
    stateRegistration: string,
    opening: string,
    phone: string,
    clientSince: string,
    municipalRegistration: string
    adresses: Address[],
    contacts: Contact[]
}