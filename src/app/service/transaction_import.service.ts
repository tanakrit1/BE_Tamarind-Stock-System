import { Injectable } from "@nestjs/common";
import { Transaction_ImportRepository } from "../repositories/transaction_import.repository";
import { Transaction_ImportPaginationModel } from "../models/transaction_import.model";

@Injectable()
export class Transaction_ImportService {
  constructor(
    private readonly transaction_importRepository: Transaction_ImportRepository
  ) { }

  async search(dto): Promise<Transaction_ImportPaginationModel> {
    const models = await this.transaction_importRepository.search(dto);
    return models
  }
}