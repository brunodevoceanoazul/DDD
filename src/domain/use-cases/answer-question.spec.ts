import { expect, test } from "vitest";
import type { AnswerRepository } from "@/domain/repositories/answer-repository.js";
import { AnswerQuestionUseCase } from "./answer-question.js";

const fakeAnswerRepository: AnswerRepository = {
    create: async () => {
        return;
    },
}

test('should be able to create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answer = await answerQuestion.execute({
        instructorId: '1',
        questionId: '1',
        content: 'Nova resposta',
    })

    expect(answer.content).toEqual('Nova resposta')
})
