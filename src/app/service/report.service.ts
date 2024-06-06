import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Import_Deposit } from "src/database/entities/import_deposit.entity";
import { Product } from "src/database/entities/product.entity";
import { Transaction_Export } from "src/database/entities/transaction_export.entity";
import { Transaction_Import } from "src/database/entities/transaction_import.entity";
import { Repository } from "typeorm";


@Injectable()
export class ReportService {
    constructor(
     
            @InjectRepository(Product)
            private readonly productRepository: Repository<Product>,
            @InjectRepository(Transaction_Import)
            private readonly transactionImportRepository: Repository<Transaction_Import>,
            @InjectRepository(Transaction_Export)
            private readonly transactionExportRepository: Repository<Transaction_Export>,
            @InjectRepository(Import_Deposit)
            private readonly importDepositRepository: Repository<Import_Deposit>,
    
    ) { }

    async reportstock(req) {
        try {
            const query = `
            SELECT 
                p.specialID, 
                p.name,
                COALESCE(
                    (SELECT SUM(ti.quantity) 
                     FROM \`transaction-import\` ti 
                     WHERE ti.productId = p.id AND ti.typeAction = 'ซื้อ-ขาย'), 0
                ) AS import_ซื้อขาย_quantity,
                COALESCE(
                    (SELECT SUM(te.quantity) 
                     FROM \`transaction-export\` te 
                     WHERE te.productId = p.id AND te.typeAction = 'ซื้อ-ขาย'), 0
                ) AS export_ซื้อขาย_quantity,
                COALESCE(
                    (SELECT SUM(te.quantity) 
                     FROM \`transaction-export\` te 
                     WHERE te.productId = p.id AND te.typeAction = 'แปรรูป'), 0
                ) AS export_แปรรูป_quantity,
                (
                    COALESCE(
                        (SELECT SUM(ti.quantity) 
                         FROM \`transaction-import\` ti 
                         WHERE ti.productId = p.id AND ti.typeAction = 'ซื้อ-ขาย'), 0
                    ) - 
                    COALESCE(
                        (SELECT SUM(te.quantity) 
                         FROM \`transaction-export\` te 
                         WHERE te.productId = p.id AND te.typeAction = 'ซื้อ-ขาย'), 0
                    ) - 
                    COALESCE(
                        (SELECT SUM(te.quantity) 
                         FROM \`transaction-export\` te 
                         WHERE te.productId = p.id AND te.typeAction = 'แปรรูป'), 0
                    )
                ) AS remaining_ซื้อขาย_แปรรูป,
                COALESCE(
                    (SELECT SUM(ide.remain) 
                     FROM \`import-deposit\` ide  
                     WHERE ide.productId = p.id
                    ), 0
                ) AS remaining_ฝากเก็บ
            FROM 
                product p;
        `;
        const results = await this.productRepository.query(query);
        return results;
        //     const queryBuilder = this.productRepository.createQueryBuilder('p');

        // queryBuilder
        //     .select(['p.specialID', 'p.name'])
        //     .addSelect(subQuery => {
        //         return subQuery
        //             .select('COALESCE(SUM(ti.quantity), 0)')
        //             .from(Transaction_Import, 'ti')
        //             .where('ti.productId = p.id')
        //             .andWhere('ti.typeAction = :typeAction', { typeAction: 'ซื้อ-ขาย' });
        //     }, 'import_ซื้อขาย_quantity')

        //     .addSelect(subQuery => {
        //         return subQuery
        //             .select('COALESCE(SUM(te.quantity), 0)')
        //             .from(Transaction_Export, 'te')
        //             .where('te.productId = p.id')
        //             .andWhere('te.typeAction = :typeAction', { typeAction: 'ซื้อ-ขาย' });
        //     }, 'export_ซื้อขาย_quantity')

        //     .addSelect(subQuery => {
        //         return subQuery
        //             .select('COALESCE(SUM(te.quantity), 0)')
        //             .from(Transaction_Export, 'te')
        //             .where('te.productId = p.id')
        //             .andWhere('te.typeAction = :typeAction', { typeAction: 'แปรรูป' });
        //     }, 'export_แปรรูป_quantity')

        //     .addSelect(subQuery => {
        //         return subQuery
        //             .select('COALESCE(SUM(ti.quantity), 0) - COALESCE(SUM(te.quantity), 0) - COALESCE(SUM(te2.quantity), 0)')
        //             .from(Transaction_Import, 'ti')
        //             .leftJoin(Transaction_Export, 'te', 'te.productId = p.id AND te.typeAction = "ซื้อ-ขาย"')
        //             .leftJoin(Transaction_Export, 'te2', 'te2.productId = p.id AND te2.typeAction = "แปรรูป"')
        //             .where('ti.productId = p.id')
        //             .andWhere('ti.typeAction = :typeAction', { typeAction: 'ซื้อ-ขาย' });
        //     }, 'remaining_ซื้อขาย')

        //     .addSelect(subQuery => {
        //         return subQuery
        //             .select('COALESCE(SUM(ide.remain), 0)')
        //             .from(Import_Deposit, 'ide')
        //             .where('ide.productId = p.id');
        //     }, 'remaining_ฝากเก็บ');


        // return await queryBuilder.getRawMany()       
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
}