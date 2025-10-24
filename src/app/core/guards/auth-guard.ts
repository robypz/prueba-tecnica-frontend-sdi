import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../auth/shared/auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.user() && authService.token()) {
    return true;
  }
  return false;
};
