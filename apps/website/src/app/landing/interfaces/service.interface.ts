import type { ITechnology } from './technology.interface';

export interface IService {
  title: string;
  summary: string;
  skills: ITechnology[];
}
