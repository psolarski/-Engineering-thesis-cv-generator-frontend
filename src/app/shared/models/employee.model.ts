import { Address } from './address.model';
import { Role } from './role.model';

export class Employee implements IEmployee{
  name: string;
  surname: string;
  username: string;
  password: string;
  token: string;
  email: string;
  phone: number;
  type: string;
  creationDate: string;
  active: boolean;
  locked: boolean;
  version: number;
  address: Address = new Address;

  roles: Role[] = [];
}
