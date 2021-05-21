import { StatusPedido } from "../enums/status-pedido.enum";
import { Lines } from "./lines";

export interface Order {
    postingDate: string,
    deliveryDate: string,
    status: StatusPedido,
    totalOrder: number,
    observation: string,
    orderLines: Lines[],
    customerId: string,
    id: string,
}
