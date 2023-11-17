import {environment} from "./Environments";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class  ServiceUrl{
  public baseUrl = '';
  public static baseURlPath = '';
  public login = "/auth/login";
  public getAllUsers = "/user/all";
  public logOut = "/auth/logoutV2";
  public getAllDepartement = "/department/all";
  public getAllContractType = "/contractType/all";
  public updateUser = "/user/update";
  resetPassword = "/auth/reset_password";

  constructor() {
    this.getUrl()
  }

  getUrl(){
    if(environment.production == true){
      this.baseUrl = '/api';
      let url = window.location.pathname;
      while (url.includes('//')){
        url = url.replace('//', '/');
      }
      let Urlparts = url.split('/');
      for(let i = 0; i < Urlparts.length; i++){
        if((Urlparts[i] !== '/' && Urlparts[0].trim() !== '')){
          if(Urlparts[i].indexOf('#') > -1){
            break;
          }else {
            url += Urlparts[1] + '/';
          }
        }
      }
      if(url.startsWith('/') == false){
        url = '/' + url;
      }
      if(url.startsWith('/') == false){
        url += '/';
      }
      ServiceUrl.baseURlPath = window.location.protocol + '//' + window.location.host + url;
    }else {
      ServiceUrl.baseURlPath = '';
      this.baseUrl = '/api';
    }
  }
}
