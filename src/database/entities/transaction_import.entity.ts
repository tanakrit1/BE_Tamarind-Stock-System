import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";
import { Product } from "./product.entity";
import { Supplier } from "./supplier.entity";

@Entity({ name: 'transaction_import' })
export class Transaction_Import extends BaseEntity {

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

    @ManyToOne(() => User, (user) => user.Transaction_Imports, { nullable: true })
    user: User;

    @ManyToOne(() => Product, (product) => product.Transaction_Imports, { nullable: true })
    product: Product;

    @ManyToOne(() => Supplier, (supplier) => supplier.Transaction_Imports, { nullable: true })
    supplier: Supplier;
}
