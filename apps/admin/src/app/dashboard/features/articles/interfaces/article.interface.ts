import { ITag } from '../../tags/interfaces';

export interface IArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  contentFormat: 'mdx';
  cover: string | null;
  published: boolean;
  publishedAt: string | null;
  tags: ITag[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
