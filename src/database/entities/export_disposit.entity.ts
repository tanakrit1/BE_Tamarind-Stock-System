import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { Supplier } from "./supplier.entity";
import { Import_Deposit } from "./import_deposit.entity";

@Entity({ name: 'export-deposit' })
export class Export_Deposit extends BaseEntity {

    @Column({ name: 'quantity', type: 'nvarchar', length: 16, nullable: true, })
    quantity: string; //จำนวนฝาก

    @Column({
        name: 'exportDate',
        type: 'date',
        nullable: true,
        comment: 'วันที่เบิก',
      })
      exportDate: Date; //วันที่เบิก

      @ManyToOne(() => User, (user) => user.Export_Deposits, { nullable: true })
      user: User;
  
      @ManyToOne(() => Product, (product) => product.Export_Deposits, { nullable: true })
      product: Product;
  
      @ManyToOne(() => Supplier, (supplier) => supplier.Export_Deposits, { nullable: true })
      supplier: Supplier;

      @ManyToOne(() => Import_Deposit, (Import_Deposit) => Import_Deposit.Export_Deposits, { nullable: true })
      Import_Deposit: Import_Deposit;

    // importID
  

    
}