import { environment } from '../../../../../environments/environment';

export function getArticleCoverUrl(cover: string | null): string | null {
  if (!cover) {
    return null;
  }

  return cover.startsWith('http://') || cover.startsWith('https://') ? cover : `${environment.apiUrl}/uploads/articles/${cover}`;
}
