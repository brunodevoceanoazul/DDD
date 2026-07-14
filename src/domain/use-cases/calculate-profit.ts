import type { Sale } from "@/domain/entities/sale.js";
import type { SaleRepository } from "@/domain/repositories/sale-repository.js";

interface CalculateProfitRequest {
    productId: string;
    startDate: Date;
    endDate: Date;
}

interface CalculateProfitResponse {
    productId: string;
    totalSales: number;
    totalAmount: number;
    totalProfit: number;
    averageProfitPerSale: number;
}

export class CalculateProfitUseCase {
    constructor(
        private saleRepository: SaleRepository
    ) {}

    async execute({ productId, startDate, endDate }: CalculateProfitRequest): Promise<CalculateProfitResponse> {
        const sales = await this.saleRepository.findByProductId(productId);

        const filteredSales = sales.filter(sale => 
            sale.soldAt >= startDate && sale.soldAt <= endDate
        );

        const totalSales = filteredSales.length;
        const totalAmount = filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
        const totalProfit = filteredSales.reduce((sum, sale) => sum + sale.profit, 0);
        const averageProfitPerSale = totalSales > 0 ? totalProfit / totalSales : 0;

        return {
            productId,
            totalSales,
            totalAmount,
            totalProfit,
            averageProfitPerSale,
        };
    }
}
