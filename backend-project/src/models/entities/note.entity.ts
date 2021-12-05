import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

@Table
export class Note extends Model {
  @AllowNull(false)
  @Column
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column
  categoryId: number;

  @AllowNull(false)
  @Column
  userId: string;
}
