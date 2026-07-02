import { IProjectLink } from './project-link.interface';

export interface IProjectPayload {
  name: string;
  summary: string;
  image?: string | null;
  links?: IProjectLink[];
}
