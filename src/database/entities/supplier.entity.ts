import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Transaction_Import } from "./transaction_import.entity";
import { Import_Deposit } from "./import_deposit.entity";
import { Export_Deposit } from "./export_disposit.entity";

@Entity({ name: 'supplier' })
export class Supplier extends BaseEntity {

    @Column({ name: 'specialID', type: 'nvarchar', length: 8 })
    specialID: string;  

    @Column({ name: 'firstName', type: 'nvarchar', length: 64 })
    firstName: string; 
    
    @Column({ name: 'lastName', type: 'nvarchar', length: 64 })
    lastName: string;  

    @Column({ name: 'address', type: 'nvarchar', length: 64 })
    address: string;  

    @Column({ name: 'subDistric', type: 'nvarchar', length: 64 })
    subDistric: string;  

    @Column({ name: 'distric', type: 'nvarchar', length: 64 })
    distric: string;  

    @Column({ name: 'province', type: 'nvarchar', length: 64 })
    province: string;  

    @Column({ name: 'zipCode', type: 'nvarchar', length: 8 })
    zipCode: string; 

    @Column({ name: 'phone', type: 'nvarchar', length: 16 ,unique: true, })
    phone: string; 

    @OneToMany(() => Transaction_Import, (Transaction_Import) => Transaction_Import.supplier)
    Transaction_Imports: Transaction_Import[];

    @OneToMany(() => Import_Deposit, (Import_Deposit) => Import_Deposit.supplier)
    Import_Deposits: Import_Deposit[];

    @OneToMany(() => Export_Deposit, (Export_Deposit) => Export_Deposit.supplier)
    Export_Deposits: Export_Deposit[];
}







