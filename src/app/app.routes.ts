import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Pokedex',
        component: HomeComponent,
      },
      {
        path: 'pokemon/:id',
        title: 'Pokemon',
        component: DetailsComponent,
      },
      {
        path: 'favorites',
        title: 'Pokemon',
        component: FavoritesComponent,
      },
    ],
  },
];
