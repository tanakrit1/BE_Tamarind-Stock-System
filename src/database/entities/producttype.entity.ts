import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Product } from "./product.entity";

@Entity({ name: 'producttype' })
export class ProductType extends BaseEntity {

    @Column({ name: 'name', type: 'nvarchar', length: 64 })
    name: string;

    @OneToMany(() => Product, (Product) => Product.ProductTypes)
    products: Product[];
}