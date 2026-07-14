import { Entity } from "@/core/entities/entity.js";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import type { Optional } from "@/core/types/optional.js";

interface AnswerProps {
    authorId: UniqueEntityID;
    questionId: UniqueEntityID;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {

    get content() {
        return this.props.content;
    }

    set content(content: string) {
        if (content.length > 2400) {
            throw new Error('Invalid content length');
        }
        this.props.content = content;
    }

    static create(
        props: Optional<AnswerProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const answer = new Answer({
            ...props,
            createdAt: new Date(),
        }, id);

        return answer;
    }
}
