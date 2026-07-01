import { INavigationItem } from '@libs/utils';

export const NAVIGATION: INavigationItem[] = [
  {
    id: 'general',
    label: 'General',
    description: 'Resource management',
    children: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        route: '/',
        icon: 'layout-dashboard'
      },
      {
        id: 'roles',
        label: 'Roles',
        route: '/roles',
        icon: 'shield-check'
      },
      {
        id: 'users',
        label: 'Users',
        route: '/users',
        icon: 'users'
      }
    ]
  },
  {
    id: 'account',
    label: 'My account',
    description: 'Account management',
    children: [
      {
        id: 'account-profile',
        label: 'My account',
        route: '/account/profile',
        icon: 'user',
        activeOptions: { exact: true }
      },
      {
        id: 'account-security',
        label: 'Password',
        route: '/account/security',
        icon: 'lock-keyhole',
        activeOptions: { exact: true }
      }
    ]
  }
];
