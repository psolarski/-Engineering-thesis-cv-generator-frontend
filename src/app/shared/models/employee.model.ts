import { Address } from './address.model';
import { Role } from './role.model';
import { Skill } from './skill.model';
import { Notification } from './notification.model';

export class Employee implements IEmployee{
  name: string;
  surname: string;
  username: string;
  token: string;
  email: string;
  phone: number;
  creationDate: Date;
  address: Address;

  roles: Role[] = [];
}
