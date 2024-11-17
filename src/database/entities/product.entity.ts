import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Transaction_Import } from "./transaction_import.entity";
import { Transaction_Export } from "./transaction_export.entity";
import { Import_Deposit } from "./import_deposit.entity";
import { Export_Deposit } from "./export_disposit.entity";
import { ProductType } from "./producttype.entity";

@Entity({ name: 'product' })
export class Product extends BaseEntity {

    @Column({ name: 'specialID', type: 'nvarchar', length: 8 })
    specialID: string;  

    @Column({ name: 'name', type: 'nvarchar', length: 64 })
    name: string;  

    @Column({ name: 'type', type: 'nvarchar', length: 32 })
    type: string; 

    @Column({ name: 'unit', type: 'nvarchar', length: 16 })
    unit: string; 

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

    @OneToMany(() => Transaction_Export, (Transaction_Export) => Transaction_Export.product)
    Transaction_Exports: Transaction_Export[];

    @OneToMany(() => Import_Deposit, (Import_Deposit) => Import_Deposit.product)
    Import_Deposits: Import_Deposit[];

    @OneToMany(() => Export_Deposit, (Export_Deposit) => Export_Deposit.product)
    Export_Deposits: Export_Deposit[];

    @ManyToOne(() => ProductType, (ProductType) => ProductType.products, { nullable: true })
    ProductTypes: ProductType;

}