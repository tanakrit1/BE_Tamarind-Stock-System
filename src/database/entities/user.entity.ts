import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Transaction_Import } from "./transaction_import.entity";
import { Transaction_Export } from "./transaction_export.entity";
import { Import_Deposit } from "./import_deposit.entity";
import { Export_Deposit } from "./export_disposit.entity";

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @Column({
        name: 'employeeID',
        type: 'nvarchar',
        length: 8,
        unique: true,
    })
    employeeID: string;
    
    @Column({ name: 'username', type: 'nvarchar', length: 16, unique: true })
    username: string;
  
    @Column({ name: 'password', type: 'nvarchar', length: 64 })
    password: string;
  
    @Column({ name: 'firstName', type: 'nvarchar', length: 50, nullable: true })
    firstName: string;
  
    @Column({ name: 'lastName', type: 'nvarchar', length: 50, nullable: true })
    lastName: string;

    @Column({ name: 'role', type: 'nvarchar', length: 16 })
    role: string;

    @OneToMany(() => Transaction_Import, (Transaction_Import) => Transaction_Import.user)
    Transaction_Imports: Transaction_Import[];

    @OneToMany(() => Transaction_Export, (Transaction_Export) => Transaction_Export.user)
    Transaction_Exports: Transaction_Export[];

    @OneToMany(() => Import_Deposit, (Import_Deposit) => Import_Deposit.user)
    Import_Deposits: Import_Deposit[];

    @OneToMany(() => Export_Deposit, (Export_Deposit) => Export_Deposit.user)
    Export_Deposits: Export_Deposit[];

}