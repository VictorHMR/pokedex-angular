import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Pokedex',
    component: HomeComponent
  },
  {
    path: 'pokemon/:id',
    title: 'Pokemon',
    component: DetailsComponent
  }
 
];
