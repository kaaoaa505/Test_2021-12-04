import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { LoginModel } from 'src/models/login.model';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
      return this.usersService.register(createUserDto);
    }

    @Post('login')
    login(@Body() loginModel: LoginModel) {
      return this.usersService.login(loginModel);
    }

    @Post('token')
    checkToken(@Req() req: any, @Res() res: any) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    return this.usersService.checkToken(token, (err: any, data: any) => {
        if (err) {
          res.status(401).send({ ok: false, error: err });
        } else {
          res.status(200).send({ ok: true, user: data });
        }
      });
    }

}
