import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'product' })
export class Product extends BaseEntity {

    @Column({ name: 'specialID', type: 'nvarchar', length: 8 })
    specialID: string;  

    @Column({ name: 'name', type: 'nvarchar', length: 64 })
    name: string;  

    @Column({ name: 'type', type: 'nvarchar', length: 32 })
    type: string;  

    @Column({ name: 'price', type: 'nvarchar', length: 8 })
    price: string;  
}