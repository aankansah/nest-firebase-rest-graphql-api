import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './customer.model';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() customer: CreateCustomerDto): Promise<Customer>{
    return this.customersService.createCustomer(customer);
  }

  @Get()
  @Auth("User")
  async findAll() {
    return this.customersService.getAllCustomers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.customersService.getCustomerById(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() customer: UpdateCustomerDto) {
    return this.customersService.updateCustomer(id, customer);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.customersService.deleteCustomer(id);
  }
}
