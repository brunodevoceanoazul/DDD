import type { Alert } from "@/domain/entities/alert.js";

export interface AlertRepository {
    create(alert: Alert): Promise<void>;
    findByProductId(productId: string): Promise<Alert[]>;
    save(alert: Alert): Promise<void>;
}
