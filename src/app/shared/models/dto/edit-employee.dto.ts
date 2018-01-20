import { Address } from '../address.model';
import { Role } from '../role.model';

export class EditEmployeeDto {
  name: string;
  surname: string;
  email: string;
  phone: number;
  type: string;
  address: Address = new Address;

  roles: Role[] = [];
}
