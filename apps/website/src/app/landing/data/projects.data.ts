import type { IProject } from '../interfaces';

export const projects: IProject[] = [
  {
    name: 'OneStop Innovation Platform',
    summary:
      'A centralized platform supporting entrepreneurs through programs, opportunities, events, projects, community access, and business visibility.',
    image: {
      src: '/projects/onestop.png',
      width: 2868,
      height: 1800,
      alt: 'OneStop Innovation Platform homepage screenshot'
    },
    links: [
      {
        label: 'Online',
        href: 'https://cinolu.org/'
      },
      {
        label: 'Web GitHub',
        href: 'https://github.com/musanzi/cinolu-onestop-web'
      },
      {
        label: 'API GitHub',
        href: 'https://github.com/musanzi/cinolu-onestop-api'
      }
    ]
  },
  {
    name: 'Fikiri SDG Mapping Solutions',
    summary:
      'A platform designed to discover, map, and test innovative solutions aligned with the Sustainable Development Goals. The platform supports solution owners and experts.',
    image: {
      src: '/projects/fikiri.png',
      width: 2864,
      height: 1800,
      alt: 'Fikiri homepage screenshot'
    },
    links: [
      {
        label: 'Online',
        href: 'https://fikiri.co/'
      },
      {
        label: 'Web GitHub',
        href: 'https://github.com/cinolu-software/fikiri.co'
      },
      {
        label: 'API GitHub',
        href: 'https://github.com/cinolu-software/api.fikiri.co'
      }
    ]
  }
];
