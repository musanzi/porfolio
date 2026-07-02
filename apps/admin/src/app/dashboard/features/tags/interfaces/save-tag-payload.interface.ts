import { ITagPayload } from './tag-payload.interface';
import { ITagQuery } from './tag-query.interface';

export interface ISaveTagPayload {
  payload: ITagPayload;
  query: ITagQuery;
  tagId?: string;
}
