import { Role } from "../enums/role.enum";

export interface Usuario {
    username: string,
    name: string,
    email: string,
    senha: string,
    passwordHash: string,
    role: Role,
    customerId?: string,
    id: string,
}
