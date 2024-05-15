import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Product } from "../entities/product.entity";

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
    listenTo() {
        return Product;
    }

    async afterInsert(event: InsertEvent<Product>) {
        const idlaw = event.entity.id.toString();
        const specialID = 'PRO' + idlaw.padStart(5, '0');
        event.entity.specialID = specialID;
        await event.manager.save(event.entity);
    }
}