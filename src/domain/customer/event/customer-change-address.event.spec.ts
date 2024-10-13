

import {CustomerChangeAddressEvent, IChangeAddressEvent} from "./customer-change-address.event";
import { ChangeAddressHandler  } from "./handler/change-address.handler";
import EventDispatcher from "../../@shared/event/event-dispatcher";

describe("Customer changed of address event tests", () => {
    it("should notify the event handlers of the change of address of a customer", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new ChangeAddressHandler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler1);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);

        const eventPayload : IChangeAddressEvent = {
            id: "123",
            name: "test",
            address: {
                street: "Street 1",
                state: "State 1",
                city: "City 1",
                zip: "Zip Code 1",
            }
        };

        const customerChangeAddressEvent = new CustomerChangeAddressEvent(eventPayload);

        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
    });

});