import { Role } from "../enums/role.enum";

export interface Usuario {
    username: string,
    nome: string,
    email: string,
    senha: string,
    role: Role,
    customerId?: string,
    id: string,
}
