import { InvoiceLine } from "./invoice-line";
import { Order } from "./order";

export interface Invoice {
    order: Order,
    orderId: string,
    releaseDate: Date,
    originOperation: string,
    baseCalcIcms: number,
    totalIcms: number,
    totalProducts: number,
    totalInvoice: number,
    integratedPlugNotasApi: string,
    invoiceLines: InvoiceLine[],
    id: string
}