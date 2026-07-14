import { Entity } from "@/core/entities/entity.js";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id.js";

type AlertType = 'low_stock' | 'out_of_stock';
type AlertChannel = 'email' | 'notification';

interface AlertProps {
    productId: UniqueEntityID;
    type: AlertType;
    message: string;
    channel: AlertChannel;
    sent: boolean;
    createdAt: Date;
    sentAt?: Date;
}

export class Alert extends Entity<AlertProps> {

    get productId() {
        return this.props.productId;
    }

    get type() {
        return this.props.type;
    }

    get message() {
        return this.props.message;
    }

    get channel() {
        return this.props.channel;
    }

    get sent() {
        return this.props.sent;
    }

    markAsSent() {
        this.props.sent = true;
        this.props.sentAt = new Date();
    }

    static create(
        props: AlertProps,
        id?: UniqueEntityID
    ) {
        const alert = new Alert(props, id);
        return alert;
    }
}
