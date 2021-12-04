import { User } from "../models/entities/user.entity";

export const UsersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];