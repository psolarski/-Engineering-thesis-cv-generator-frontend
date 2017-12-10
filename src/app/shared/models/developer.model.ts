import { Notification } from './notification.model';
import { Skill } from './skill.model';
import { Role } from './role.model';
import { Education } from './education.model';

export class Developer implements IEmployee {

  name: string;
  surname: string;
  username: string;
  token: string;
  email: string;
  phone: number;

  roles: Role[] = [];
  skills: Skill[];
  educations: Education[] = [];
  notifications: Notification[] = [];
}
