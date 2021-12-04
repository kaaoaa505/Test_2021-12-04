import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: 3306,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      });

      sequelize.addModels([User]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
