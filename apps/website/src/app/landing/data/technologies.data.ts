import type { ITechnology } from '../interfaces';

export const technologies = {
  angular: { label: 'Angular', logo: '/logos/ng-img.jpeg' },
  angularMaterial: { label: 'Angular Material', logo: '/logos/ng-material.png' },
  nx: { label: 'Nx monorepos', logo: '/logos/nx.png' },
  node: { label: 'Node.JS', logo: '/logos/nodejs.png' },
  psql: { label: 'PostgreSQL', logo: '/logos/psql.png' },
  docker: { label: 'Docker & Docker compose', logo: '/logos/docker.jpeg' },
  githubActions: { label: 'GitHub Actions', logo: '/logos/gh-actions.png' },
  linux: { label: 'Linux', logo: '/logos/linux.jpeg' },
  nestjs: { label: 'NestJS', logo: '/logos/nestjs.png' },
  tailwind: { label: 'Tailwind CSS', logo: '/logos/tailwindcss.png' },
  typescript: { label: 'TypeScript', logo: '/logos/ts.png' },
  vps: { label: 'VPS', logo: '/logos/vps.png' }
} satisfies Record<string, ITechnology>;
