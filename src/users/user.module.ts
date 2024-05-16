import { Module } from '@nestjs/common';

import { FirebaseModule } from '../firebase/firebase.admin.setup';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  imports: [FirebaseModule],
  controllers: [UsersController],
  providers: [UsersService,UsersController],
})
export class UsersModule {}