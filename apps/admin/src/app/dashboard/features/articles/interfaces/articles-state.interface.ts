import { IArticle } from './article.interface';

export interface IArticlesState {
  article: IArticle | null;
  data: [IArticle[], number];
  error: string | null;
  isLoading: boolean;
  isSaving: boolean;
  success: string | null;
}
