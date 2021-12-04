import { LoginModel } from './../models/login.model';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';

import { User } from '../models/entities/user.entity';
import { CreateUserDto } from './../models/dto/create-user.dto';

@Injectable()
export class UsersService {
  secret = process.env.HASH_SECRET;
  saltOrRounds = parseInt(process.env.HASH_ROUNDS);

  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  convertHashToString(arg: any): string {
    return new String(arg).valueOf();
  }

  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.saltOrRounds);
    return this.convertHashToString(hash);
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.active = false;

    return await this.hash(createUserDto.password).then((passwordHashed) => {
      createUserDto.password = passwordHashed;
      return this.usersRepository.create(createUserDto);
    });
  }

  async login(loginModel: LoginModel): Promise<any> {
    const username = loginModel.username;
    return this.usersRepository
      .findOne({
        where: {
          username: loginModel.username,
        },
      })
      .then((u) => {
        if (u && u.username) {
          return bcrypt
            .compare(loginModel.password, u.password)
            .then((match) => {
              console.log('userService.login match : ', match);
              if (match) {
                const token = jsonwebtoken.sign(
                  {
                    username,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                  },
                  this.secret,
                );
                token
                return token;
              } else
                throw new Error('Username or password could not be found!');
            });
        } else {
          throw new Error('Username or password could not be found!');
        }
      });
  }

  checkToken = (token, cb) => {
    jsonwebtoken.verify(token, this.secret, (err, decoded) => {
      console.log('error: ', err, 'decoded: ', decoded);
      if (err) {
        cb(err);
      } else {
        cb(null, decoded.username);
      }
    });
  };
  
}
