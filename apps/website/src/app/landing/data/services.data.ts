import type { IService } from '../interfaces';
import { technologies } from './technologies.data';

export const services: IService[] = [
  {
    title: 'Fullstack Web Development',
    summary:
      'Complete Angular and NestJS applications with clean architecture, secure authentication, reusable modules, and scalable project structure.',
    skills: [
      technologies.angular,
      technologies.nestjs,
      technologies.typescript,
      technologies.psql,
      { label: 'REST APIs' },
      { label: 'RBAC' }
    ]
  },
  {
    title: 'DevOps & Deployment',
    summary:
      'Repeatable deployment workflows using Docker, GitHub Actions, VPS servers, reverse proxies, PM2, and production onboarding practices.',
    skills: [
      technologies.docker,
      technologies.githubActions,
      technologies.vps,
      technologies.linux,
      { label: 'PM2' },
      { label: 'Caddy/Nginx' }
    ]
  }
];
