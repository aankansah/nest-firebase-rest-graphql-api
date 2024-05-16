import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSignInDto } from './dto/user-signin.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  
  getAllUsers(): Promise<any> {
    return this.usersRepository.getAllUsers();
  }
  signUp(request:CreateUserDto): Promise<any> {
    return this.usersRepository.signUp(request);
  }

  signIn(request:UserSignInDto): Promise<any> {
    return this.usersRepository.signIn(request);
  }
}