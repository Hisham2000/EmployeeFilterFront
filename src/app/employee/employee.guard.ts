import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {ServiceCall} from "../../utilis/service-call.service";

export const employeeGuard: CanActivateFn = (route, state) => {
  const serviceCall = inject(ServiceCall);
  let loggedInUser = serviceCall.getLoggedInUser();
  if(loggedInUser){
    return true;
  }
  return false;
};
