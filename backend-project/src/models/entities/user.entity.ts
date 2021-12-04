import { Table, Column, Model, Unique } from 'sequelize-typescript';

@Table
export class User extends Model {
    
    @Unique(true)
    @Column
    username: string;

    @Unique(true)
    @Column
    email: string;

    @Column
    password: string;

    @Column
    image: string;

    @Column
    active: boolean;
}
