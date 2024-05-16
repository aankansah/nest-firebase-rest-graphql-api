import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './customer.model';

@Resolver('Customer')
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Query('getCustomers')
  async getCustomers(): Promise<Customer[]> {
    return this.customersService.getAllCustomers();
  }

  @Query('getCustomer')
  async getCustomer(@Args('id') id: string): Promise<Customer> {
    return this.customersService.getCustomerById(id);
  }

  @Mutation('createCustomer')
  async createCustomer(@Args('createCustomerInput') createCustomerInput: CreateCustomerDto): Promise<Customer> {
    return this.customersService.createCustomer(createCustomerInput);
  }

  @Mutation('updateCustomer')
  async updateCustomer(@Args('id') id: string, @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerDto): Promise<void> {
    return this.customersService.updateCustomer(id, updateCustomerInput);
  }

  @Mutation('deleteCustomer')
  async deleteCustomer(@Args('id') id: string): Promise<void> {
    return this.customersService.deleteCustomer(id);
  }
}
