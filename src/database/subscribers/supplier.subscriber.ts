import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Supplier } from "../entities/supplier.entity";

@EventSubscriber()
export class SupplierSubscriber implements EntitySubscriberInterface<Supplier> {
    listenTo() {
        return Supplier;
    }

    async afterInsert(event: InsertEvent<Supplier>) {
        const idlaw = event.entity.id.toString();
        const specialID = 'SUP' + idlaw.padStart(5, '0');
        event.entity.specialID = specialID;
        await event.manager.save(event.entity);
    }
}