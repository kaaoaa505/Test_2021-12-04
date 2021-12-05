import { Table, Column, Model, Unique, AllowNull } from 'sequelize-typescript';

@Table
export class User extends Model {
  @AllowNull(false)
  @Unique(true)
  @Column
  username: string;

  @Unique(true)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @Column
  image: string;

  @Column
  active: boolean;
}
