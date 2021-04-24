import { Lines } from "./lines";

export interface Order {
    postingDate: string,
    deliveryDate: string,
    observation: string,
    orderLines: Lines[],
    customerId: string
}
