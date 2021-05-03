import { Lines } from "./lines";

export interface Order {
    id: string,
    postingDate: string,
    deliveryDate: string,
    observation: string,
    orderLines: Lines[],
    customerId: string
}
