import { IProjectLink } from './project-link.interface';

export interface IProjectForm {
  name: string;
  summary: string;
  links: IProjectLink[];
}
