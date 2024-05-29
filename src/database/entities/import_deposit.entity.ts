import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { Supplier } from "./supplier.entity";

@Entity({ name: 'import-deposit' })
export class Import_Deposit extends BaseEntity {

    @Column({ name: 'quantity', type: 'nvarchar', length: 16, nullable: true, })
    quantity: string; //จำนวนฝาก

    @Column({
        name: 'importDate',
        type: 'date',
        nullable: true,
        comment: 'วันที่ฝาก',
      })
      importDate: Date; //วันที่ฝาก

      @Column({
        name: 'periodDate',
        type: 'date',
        nullable: true,
        comment: 'วันที่กำหนดเบิก',
      })
      periodDate: Date; //วันที่กำหนดเบิก

    @Column({
        name: 'price',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
    })
    price: number; //ราคาค่าฝาก

    @Column({ name: 'remain', type: 'nvarchar', length: 16, nullable: true, })
    remain: string; //จำนวนคงเหลือ

    @ManyToOne(() => User, (user) => user.Import_Deposits, { nullable: true })
    user: User;

    @ManyToOne(() => Product, (product) => product.Import_Deposits, { nullable: true })
    product: Product;

    @ManyToOne(() => Supplier, (supplier) => supplier.Import_Deposits, { nullable: true })
    supplier: Supplier;

   //exportID
}