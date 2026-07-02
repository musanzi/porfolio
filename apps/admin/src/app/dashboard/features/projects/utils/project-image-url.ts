import { environment } from '../../../../../environments/environment';

export function getProjectImageUrl(image: string | null): string | null {
  if (!image) {
    return null;
  }

  return image.startsWith('http://') || image.startsWith('https://') ? image : `${environment.apiUrl}/uploads/projects/${image}`;
}
