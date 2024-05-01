import {
  HttpException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DuplicateDataException } from './duplicate-data.exception';
import { InvalidDataLengthException } from './invalid-data-length.exception';
import { NotFoundException } from './not-found.exception';
import { BadRequestException } from './bad-request.exception';

export const ControllerException = (error: {
  getResponse: () => string | Record<string, any>;
  getStatus: () => number;
  message: any;
}): Error => {
  if (error instanceof UnauthorizedException) {
    return new UnauthorizedException();
  } else if (error instanceof BadRequestException) {
    return new HttpException(error?.getResponse(), error?.getStatus());
  } else if (error instanceof InternalServerErrorException) {
    const message = error.message;
    if (message?.includes('Violation of UNIQUE KEY constraint')) {
      const regex = /duplicate key value is \((.*?)\)/;
      const match = message.match(regex);
      if (match && match.length > 1) {
        const duplicatedValue = match[1];
        return new DuplicateDataException(
          `ข้อมูลที่มีค่าเป็น '${duplicatedValue}' ถูกใช้งานแล้วไม่สามารถบันทึกค่าซ้ำลงระบบได้`,
          duplicatedValue,
        );
      }
    }
    if (message?.includes('invalid data length or metadata length')) {
      const regexParameter = /"@(.*?)"/;
      const matchParameter = message.match(regexParameter);
      if (matchParameter && matchParameter.length > 1) {
        const indexParameter = matchParameter[1];
        const regex = new RegExp(`"([^"]*)" = @${indexParameter}`);
        const match = message.match(regex);
        if (match && match.length > 1) {
          const index = match[1];
          return new InvalidDataLengthException(
            `ข้อมูล '${index}' มีขนาดตัวอักษรยาวเกินกำหนด`,
            index,
          );
        }
      }
      return new InternalServerErrorException();
    }
    if (
      message?.includes(
        'Error: The INSERT statement conflicted with the FOREIGN KEY constraint',
      )
    ) {
      const pattern =
        /Error: The INSERT statement conflicted with the FOREIGN KEY constraint "(.*?)".+?database "(.*?)", table "(.*?)", column '(.*?)'/;
      const matches: RegExpMatchArray | null = message.match(pattern);
      if (matches) {
        const table_name: string = matches[3];
        const column_name: string = matches[4];
        return new NotFoundException({
          entity: table_name.slice(4),
          field: column_name,
        });
      }
      return new InternalServerErrorException();
    }
    if (message?.includes('Invalid column name')) {
      const regex = /'([^']+)'/;
      const match = message.match(regex);

      if (match) {
        const result = match[1];
        return new BadRequestException(
          result,
          `ไม่พบคอลัมน์ ${result} ที่คุณต้องการกรุณาตรวจสอบ`,
        );
      } else {
        return new InternalServerErrorException();
      }
    }

    if (message?.includes('could not be bound.SELECT')) {
      const regex =
        /The multi-part identifier "(.*?)" could not be bound\.SELECT/;
      const match = message.match(regex);
      let field = '';
      if (match) {
        const result = match[1];
        field = result;
      } else {
        field = '';
      }
      return new BadRequestException(field, `ไม่สามารถผูกตัวระบุหลายส่วนได้`);
    }

    if (message?.includes('Cannot call methods on nvarchar')) {
      return new BadRequestException(
        'Cannot call methods on nvarchar',
        `ไม่พบคอลัมน์ที่คุณต้องการกรุณาตรวจสอบ`,
      );
    }

    if (message?.includes('to data type bit')) {
      const regex = /value '([^']*)' to data type bit/;
      const match = message.match(regex);
      if (match) {
        const result = match[1];
        return new BadRequestException(
          result,
          `ต้องเป็นบูลีนเท่านั้น ค่า '${result}' เป็นข้อความไม่สามารถทำงานได้`,
        );
      } else {
        return new InternalServerErrorException();
      }
    }

    return new InternalServerErrorException();
  } else {
    return new HttpException(error?.getResponse(), error?.getStatus());
  }
};
