import EventInterface from "../../@shared/event/event.interface";

export interface IChangeAddressEvent {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
    }
}

export class CustomerChangeAddressEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: IChangeAddressEvent;

    constructor(eventPayload: IChangeAddressEvent) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventPayload;
    }
}