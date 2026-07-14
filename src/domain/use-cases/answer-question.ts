import { Answer } from "@/domain/entities/answer.js";
import { AnswerRepository } from "@/domain/repositories/answer-repository.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";

interface AnswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

export class AnswerQuestionUseCase {
    constructor(
        private answerRepository: AnswerRepository,
    ) { }

    async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId)
        });

        await this.answerRepository.create(answer);

        return answer;
    }
}
