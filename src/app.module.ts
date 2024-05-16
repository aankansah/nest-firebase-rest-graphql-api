import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/user.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    CustomersModule,
    UsersModule,
    // GraphqlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
