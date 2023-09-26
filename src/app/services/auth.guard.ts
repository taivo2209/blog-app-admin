import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService)

  if (auth.isLoggedInGuard) {
    return true;
  } else {
    toastr.warning('Please login to access this Page!!')
    router.navigate(['/login']);
    return false;
  }
};
