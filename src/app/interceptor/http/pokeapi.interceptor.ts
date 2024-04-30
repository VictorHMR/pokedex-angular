import { HttpInterceptorFn } from '@angular/common/http';
import { shareReplay } from 'rxjs';

export const pokeapiInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(shareReplay());
};
