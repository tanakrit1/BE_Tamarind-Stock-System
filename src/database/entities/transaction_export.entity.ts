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

    @Column({
        name: 'exportDate',
        type: 'date',
        nullable: true,
        comment: 'วันที่ส่งออก',
      })
      exportDate: Date;

    
    @Column({ name: 'typeAction', type: 'nvarchar', length: 16, nullable: true, })
    typeAction: string;


    @Column({ name: 'shipAddress', type: 'nvarchar', length: 64 })
    shipAddress: string;  

    @Column({ name: 'shipSubDistrict', type: 'nvarchar', length: 64 })
    shipSubDistrict: string;  

    @Column({ name: 'shipDistrict', type: 'nvarchar', length: 64 })
    shipDistrict: string;  

    @Column({ name: 'shipProvince', type: 'nvarchar', length: 64 })
    shipProvince: string;  

    @Column({ name: 'shipZipCode', type: 'nvarchar', length: 8 })
    shipZipCode: string; 


    @ManyToOne(() => User, (user) => user.Transaction_Exports, { nullable: true })
    user: User;

    @ManyToOne(() => Product, (product) => product.Transaction_Exports, { nullable: true })
    product: Product;

    @ManyToOne(() => Customer, (customer) => customer.Transaction_Exports, { nullable: true })
    customer: Customer;
}
