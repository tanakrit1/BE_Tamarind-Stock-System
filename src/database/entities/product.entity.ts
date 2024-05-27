import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Transaction_Import } from "./transaction_import.entity";
import { Transaction_Export } from "./transaction_export.entity";

@Entity({ name: 'product' })
export class Product extends BaseEntity {

    @Column({ name: 'specialID', type: 'nvarchar', length: 8 })
    specialID: string;  

    @Column({ name: 'name', type: 'nvarchar', length: 64 })
    name: string;  

    @Column({ name: 'type', type: 'nvarchar', length: 32 })
    type: string;  

    @Column({
        name: 'price',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
    })
    price: number;

    @Column({
        name: 'priceOut',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
    })
    priceOut: number;
    
    @OneToMany(() => Transaction_Import, (Transaction_Import) => Transaction_Import.product)
    Transaction_Imports: Transaction_Import[];

    @OneToMany(() => Transaction_Export, (Transaction_Export) => Transaction_Export.user)
    Transaction_Exports: Transaction_Export[];
}