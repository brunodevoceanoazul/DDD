import { Alert } from "@/domain/entities/alert.js";
import type { AlertRepository } from "@/domain/repositories/alert-repository.js";
import type { StockRepository } from "@/domain/repositories/stock-repository.js";

type AlertChannel = 'email' | 'notification';

interface SendStockAlertRequest {
    channel: AlertChannel;
}

interface SendStockAlertResponse {
    alerts: Alert[];
}

export class SendStockAlertUseCase {
    constructor(
        private alertRepository: AlertRepository,
        private stockRepository: StockRepository
    ) {}

    async execute({ channel }: SendStockAlertRequest): Promise<SendStockAlertResponse> {
        const lowStockItems = await this.stockRepository.findLowStock();

        const alerts: Alert[] = [];

        for (const stock of lowStockItems) {
            const alertType = stock.quantity === 0 ? 'out_of_stock' : 'low_stock';
            const message = stock.quantity === 0
                ? `Product is out of stock`
                : `Product stock is low: ${stock.quantity} remaining (minimum: ${stock.minimumQuantity})`;

            const alert = Alert.create({
                productId: stock.productId,
                type: alertType,
                message,
                channel,
                sent: false,
                createdAt: new Date(),
            });

            alert.markAsSent();

            await this.alertRepository.create(alert);
            alerts.push(alert);
        }

        return { alerts };
    }
}
