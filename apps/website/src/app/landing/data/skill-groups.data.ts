import type { ISkillGroup } from '../interfaces';
import { technologies } from './technologies.data';

export const skillGroups: ISkillGroup[] = [
  {
    title: 'Frontend',
    items: [technologies.angular, technologies.angularMaterial, technologies.tailwind, technologies.nx, technologies.typescript]
  },
  {
    title: 'Backend',
    items: [technologies.nestjs, technologies.node, technologies.psql]
  },
  {
    title: 'DevOps',
    items: [
      technologies.docker,
      technologies.githubActions,
      { label: 'VPS deployment', logo: technologies.vps.logo },
      technologies.linux
    ]
  }
];
