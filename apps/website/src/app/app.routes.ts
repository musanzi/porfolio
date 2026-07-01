import { Route } from '@angular/router';
import { LandingLayout } from './landing/layout/layout';

export const routes: Route[] = [
  {
    path: '',
    component: LandingLayout,
    loadChildren: () => import('./landing/landing.routes').then((r) => r.landingRoutes)
  }
];
