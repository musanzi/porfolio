import { Route } from '@angular/router';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    title: 'Stats',
    loadComponent: () => import('./features/stats/pages/stats/stats').then((c) => c.Stats)
  },
  {
    path: 'roles',
    title: 'Roles',
    loadComponent: () => import('./features/roles/pages/roles/roles').then((c) => c.Roles)
  },
  {
    path: 'users',
    title: 'Users',
    loadComponent: () => import('./features/users/pages/users/users').then((c) => c.Users)
  },
  {
    path: 'account',
    title: 'Account',
    loadChildren: () => import('./features/account/account.routes').then((r) => r.accountRoutes)
  }
];
