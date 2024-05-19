import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'customer' })
export class Customer extends BaseEntity {

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

}