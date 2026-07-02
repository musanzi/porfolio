import { IArticlePayload } from './article-payload.interface';
import { IArticleQuery } from './article-query.interface';

export interface ISaveArticlePayload {
  cover?: File | null;
  articleId?: string;
  payload: IArticlePayload;
  query?: IArticleQuery;
}
