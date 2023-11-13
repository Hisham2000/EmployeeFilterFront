import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ServiceCall} from "../../utilis/service-call.service";

export const authenticationGuard: CanActivateFn = (route, state) => {
    const serviceCall = inject(ServiceCall);
    const router = inject(Router);
    if (localStorage.length > 0 && !serviceCall.checkJwt()) {
      let loginUser = serviceCall.getLoggedInUser();
      router.navigate(['/employee']);
      return false;
    }
    localStorage.clear();
    return true;
  }
;
