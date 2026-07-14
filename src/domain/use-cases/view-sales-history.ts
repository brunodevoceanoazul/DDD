import type { Sale } from "@/domain/entities/sale.js";
import type { SaleRepository } from "@/domain/repositories/sale-repository.js";

interface ViewSalesHistoryRequest {
    productId?: string;
    startDate: Date;
    endDate: Date;
}

interface ViewSalesHistoryResponse {
    sales: Sale[];
    totalAmount: number;
    totalProfit: number;
}

export class ViewSalesHistoryUseCase {
    constructor(
        private saleRepository: SaleRepository
    ) {}

    async execute({ productId, startDate, endDate }: ViewSalesHistoryRequest): Promise<ViewSalesHistoryResponse> {
        let sales: Sale[];

        if (productId) {
            sales = await this.saleRepository.findByProductId(productId);
        } else {
            sales = await this.saleRepository.findByPeriod(startDate, endDate);
        }

        const filteredSales = sales.filter(sale => 
            sale.soldAt >= startDate && sale.soldAt <= endDate
        );

        const totalAmount = filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
        const totalProfit = filteredSales.reduce((sum, sale) => sum + sale.profit, 0);

        return {
            sales: filteredSales,
            totalAmount,
            totalProfit,
        };
    }
}
