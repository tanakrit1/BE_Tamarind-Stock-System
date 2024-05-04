import { Transform, Type } from "class-transformer";
import { User } from "src/database/entities/user.entity";
import { omit } from 'lodash';


export class UserModel extends User { }

export class UserPaginationModel {
    @Type(() => UserModel)
    @Transform(({ value }) =>
      value.map((user: UserModel) =>
        omit(user, ['password', 'deletedAt']),
      ),
    )
    users: UserModel[];
    totalItems: number;
  }