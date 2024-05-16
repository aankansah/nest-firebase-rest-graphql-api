import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.admin.setup';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';

@Module({
  imports: [FirebaseModule],
  controllers: [CustomersController],
  providers: [CustomersService,CustomersController],
  exports: [CustomersService]
})
export class CustomersModule {}