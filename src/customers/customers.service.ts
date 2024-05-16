import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { Customer } from './customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  async createCustomer(customer: CreateCustomerDto): Promise<Customer> {
    try {
      const createdCustomer = await this.customersRepository.create(customer);
      return createdCustomer;
    } catch (error) {
      throw new Error('Failed to create customer');
    }
  }

  async getAllCustomers(): Promise<Customer[]> {
    try {
      const customers: Customer[] = await this.customersRepository.findAll();
      return customers;
    } catch (error) {
      throw new Error('Failed to fetch customers');
    }
  }

  async getCustomerById(id: string): Promise<Customer> {
    try {
      const customer:Customer = await this.customersRepository.findOne(id);
      return customer;
    } catch (error) {
      throw new Error('Failed to fetch customer');
    }
  }

  async updateCustomer(id: string, customer: UpdateCustomerDto): Promise<void> {
    try {
      await this.customersRepository.update(id, customer);
    } catch (error) {
      throw new Error('Failed to update customer');
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      await this.customersRepository.remove(id);
    } catch (error) {
      throw new Error('Failed to delete customer');
    }
  }
}
