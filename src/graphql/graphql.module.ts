import { Module } from '@nestjs/common';
import { join } from 'path';
import { CustomersModule } from '../customers/customers.module';
import { CustomersResolver } from '../customers/customers.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    CustomersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
    }),
  ],
  providers: [CustomersResolver],
})
export class GraphqlModule {}
