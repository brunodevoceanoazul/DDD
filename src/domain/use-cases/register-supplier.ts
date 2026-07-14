import { Supplier } from "@/domain/entities/supplier.js";
import type { SupplierRepository } from "@/domain/repositories/supplier-repository.js";

interface RegisterSupplierRequest {
    name: string;
    email: string;
    phone?: string;
    address?: string;
}

interface RegisterSupplierResponse {
    supplier: Supplier;
}

export class RegisterSupplierUseCase {
    constructor(
        private supplierRepository: SupplierRepository
    ) {}

    async execute({ name, email, phone, address }: RegisterSupplierRequest): Promise<RegisterSupplierResponse> {
        const supplier = Supplier.create({
            name,
            email,
            phone,
            address,
            createdAt: new Date(),
        });

        await this.supplierRepository.create(supplier);

        return { supplier };
    }
}
