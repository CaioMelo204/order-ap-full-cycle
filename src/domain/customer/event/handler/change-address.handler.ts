import {CustomerChangeAddressEvent, IChangeAddressEvent} from "../customer-change-address.event";
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export class ChangeAddressHandler implements EventHandlerInterface<CustomerChangeAddressEvent> {
    handle({ eventData }: CustomerChangeAddressEvent): void {
        console.log(`Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para:`);
        console.log(eventData.address)
    }
}