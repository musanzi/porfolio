import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { AuthStore } from './auth/data-access';

export const provideApp = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    provideAppInitializer(() => {
      inject(AuthStore).getProfile();
    })
  ]);
