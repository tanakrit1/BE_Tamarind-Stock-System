import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Customer } from "../entities/customer.entity";

@EventSubscriber()
export class CustomerSubscriber implements EntitySubscriberInterface<Customer> {
    listenTo() {
        return Customer;
    }

    async afterInsert(event: InsertEvent<Customer>) {
        const idlaw = event.entity.id.toString();
        const specialID = 'CUS' + idlaw.padStart(5, '0');
        event.entity.specialID = specialID;
        await event.manager.save(event.entity);
    }
}