import { Notification } from './notification.model';
import { Skill } from './skill.model';
import { Role } from './role.model';
import { Education } from './education.model';
import { Project } from './project.model';

export class Developer implements IEmployee {

  name: string;
  surname: string;
  username: string;
  password: string;
  token: string;
  email: string;
  creationDate: string;
  phone: number;

  roles: Role[] = [];
  skills: Skill[];
  educations: Education[] = [];
  notifications: Notification[] = [];
  projects: Project[] = [];
}
