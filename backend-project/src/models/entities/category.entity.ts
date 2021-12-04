import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

@Table
export class Category extends Model {
  @AllowNull(false)
  @Column
  name: string;
}
