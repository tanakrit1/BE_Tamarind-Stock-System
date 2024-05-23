import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";
import { Product } from "./product.entity";
import { Customer } from "./customer.entity";

@Entity({ name: 'transaction-export' })
export class Transaction_Export extends BaseEntity {

    @Column({ name: 'quantity', type: 'nvarchar', length: 16, nullable: true, })
    quantity: string;

    @Column({
        name: 'price',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
    })
    price: number;

    @Column({
        name: 'priceDeposit',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
    })
    priceDeposit: number;

    @Column({ name: 'typeAction', type: 'nvarchar', length: 16, nullable: true, })
    typeAction: string;

    @ManyToOne(() => User, (user) => user.Transaction_Exports, { nullable: true })
    user: User;

    @ManyToOne(() => Product, (product) => product.Transaction_Exports, { nullable: true })
    product: Product;

    @ManyToOne(() => Customer, (customer) => customer.Transaction_Exports, { nullable: true })
    customer: Customer;
}
