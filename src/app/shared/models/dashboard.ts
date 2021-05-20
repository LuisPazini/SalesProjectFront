export interface Dashboard {
    start: string,
    end: string,
    openOrders: number,
    approvedOrders: number,
    canceledOrders: number,
    billedOrders: number,
    biggestOrder: number,
    lowestOrder: number,
    averageOrders: number,
    totalSales: number,
    valid: boolean,
    notifications: [],
    id: string
}