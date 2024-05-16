import { Auth } from 'src/decorators/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSignInDto } from './dto/user-signin.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";

@Controller()
export class UsersController{
    constructor(private readonly usersService: UsersService) {}
    
    @Post("auth/signup")
    @UsePipes(ValidationPipe)
    signUp(@Body() req:CreateUserDto): any {
      return this.usersService.signUp(req);
    }

    @Post("auth/login")
    @UsePipes(ValidationPipe)
    signIn(@Body() req:UserSignInDto): any {
      return this.usersService.signIn(req);
    }

    @Get("users")
    @Auth("ADMIN")
    getAllUsers():any {
      return this.usersService.getAllUsers();
    }
}