import { IProjectPayload } from './project-payload.interface';
import { IProjectQuery } from './project-query.interface';

export interface ISaveProjectPayload {
  payload: IProjectPayload;
  query?: IProjectQuery;
  image?: File | null;
  projectId?: string;
}
