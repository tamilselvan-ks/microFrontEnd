import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
          import('./micro/micro-routing.module').then(
            (m) => m.MicroRoutingModule
          ),
      },
];
