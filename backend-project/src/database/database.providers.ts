import { Sequelize } from 'sequelize-typescript';
import { Category } from '../models/entities/category.entity';
import { Note } from '../models/entities/note.entity';
import { User } from '../models/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      });

      sequelize.addModels([User, Category, Note]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
