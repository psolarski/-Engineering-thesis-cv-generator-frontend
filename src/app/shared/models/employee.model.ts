import { Address } from './address.model';

export class Employee implements IEmployee {
  name: string;
  surname: string;
  username: string;
  token: string;
  email: string;
  phone: number;
  creationDate: Date;
  address: Address;
}
