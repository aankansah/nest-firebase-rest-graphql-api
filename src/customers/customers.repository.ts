import { Inject, Injectable } from '@nestjs/common';
import { app, firestore } from 'firebase-admin';
import { Customer } from './customer.model';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersRepository {
  #db: firestore.Firestore;
  #collection: firestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#collection = this.#db.collection('customers');
  }

  async create(customer: Customer): Promise<Customer> {
    try {
      const customerRef = await this.#collection.add(customer);
      const customerSnapshot = await customerRef.get();
      return { id: customerRef.id, ...customerSnapshot.data() } as Customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Failed to create customer');
    }
  }

  async findAll(): Promise<Customer[]> {
    try {
      const querySnapshot = await this.#collection.get();
      const customers = [];
      querySnapshot.forEach(doc => {
        customers.push({ id: doc.id, ...doc.data() });
      });
      return customers;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw new Error('Failed to fetch customers');
    }
  }

  async findOne(id: string): Promise<Customer> {
    try {
      const customerSnapshot = await this.#collection.doc(id).get();
      if (customerSnapshot.exists) {
        return { id: customerSnapshot.id, ...customerSnapshot.data() } as Customer;
      } else {
        throw new Error('Customer not found');
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw new Error('Failed to fetch customer');
    }
  }

  async update(id: string, customer: UpdateCustomerDto): Promise<void> {
    try {
      await this.#collection.doc(id).set(customer, { merge: true });
    } catch (error) {
      console.error('Error updating customer:', error);
      throw new Error('Failed to update customer');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.#collection.doc(id).delete();
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw new Error('Failed to delete customer');
    }
  }
}
