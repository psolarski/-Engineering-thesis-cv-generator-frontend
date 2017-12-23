import { Address } from './address.model';
import { Role } from './role.model';
import { Skill } from './skill.model';
import { Notification } from './notification.model';

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
  address: Address = new Address;

  roles: Role[] = [];
}
