import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth-service';

export const loggedUserGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate(['/app/boards']);
    return false;
  } else {
    return true;
  }
};
