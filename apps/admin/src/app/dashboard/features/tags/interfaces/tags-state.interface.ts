import { ITag } from './tag.interface';

export interface ITagsState {
  data: [ITag[], number];
  error: string | null;
  isLoading: boolean;
  success: string | null;
}
