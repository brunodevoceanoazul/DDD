import type { Answer } from "@/domain/entities/answer.js";

export interface AnswerRepository {
    create(answer: Answer): Promise<void>;
}

export const AnswerRepository = Symbol('AnswerRepository');