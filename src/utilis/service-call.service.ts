import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import * as jwt_decode from 'jwt-decode';
import {catchError, map, Observable, throwError} from "rxjs";
import Swal from 'sweetalert2'
import {ServiceUrl} from "./service-url.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceCall {
  response = {};
  r2: any;

  constructor(private _serviceUrl: ServiceUrl, private _http: HttpClient, private _router: Router) {
  }

  getDefaultHeaders(config: any) {
    let defaultConfig = null;
    if (config == null) {
      defaultConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '' + localStorage.getItem("Authorization")
        }
      };
    } else if (config == "text") {
      defaultConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '' + localStorage.getItem("Authorization")
        },
        'responseType': 'text'
      };
    } else if (config == 'file') {
      defaultConfig = new HttpHeaders({
        'Authorization': '' + localStorage.getItem("Authorization"),
        'ngsw-bypass': ''
      });
    } else {
      defaultConfig = config;
    }
    return defaultConfig;
  }

  refresh() {
    window.location.reload();
  }

  public handleUrl(url: string) {
    url = url.replace("://", "&#&").replace(/\/\/+/g, "/").replace("&#&", "://");
    return url;
  }

  checkJwt() {
    let token = localStorage.getItem("Authorization");
    let expired = false;
    if (token != null) {
      token = token.substring("Bearer ".length);
      let decode: any = {};
      // @ts-ignore
      decode = jwt_decode(token);
      if (decode.exp * 1000 < Date.now()) {
        localStorage.clear();
        expired = true;
      }
    }
    return expired;
  }

  getLoggedInUser(){
    let token = localStorage.getItem("Authorization");
    if (token != null) {
      token = token.substring("Bearer ".length);
      let decode: any = {};
      // @ts-ignore
      decode = jwt_decode(token);
      if (decode.sub) {
        let user = JSON.parse(decode.sub);
        return user;
      }
    }
    return ;
  }

  public getOpservable<T>(url: string, _headers: any, alertError: boolean = true) {
    url = this.handleUrl(url);
    if (this.checkJwt() == false) {
      this.response = {};
      return this._http.get<any>(url, _headers).pipe(
        map((data: any) => {
          if (data != null && data.restException != null) {
            return this.handleError(data.restException.ErrorMessage, alertError, url);
          } else {
            return data;
          }
        }), catchError(error => {
          this.handleError(error, alertError, url);
          return throwError(null);
        })
      );
    } else {
      return new Observable<T>()
    }
  }

  public postObservable<T>(url: string, requestBody: any, _headers: any, alertError = true): Observable<T> {
    url = this.handleUrl(url);
    if (this.checkJwt() == false) {
      this.response = {};
      return this._http.post<any>(url, requestBody, _headers).pipe(
        map((data: any) => {
          if (data != null && data.restException != null) {
            return this.handleError(data.restException.ErrorMessage, alertError, url);
          } else {
            return data;
          }
        }), catchError(error => {
          this.handleError(error, alertError, url);
          return throwError(null);
        })
      )
    } else {
      return new Observable<T>();
    }
  }

  public handleError(error: any, alertError: boolean, url: string) {
    if (error instanceof Error && error.message == '') {
      return throwError(null);
    }
    let err: string;
    try {
      if (error instanceof HttpErrorResponse) {
        if (error.status == 406) {
          err = error.error;
        } else if (error.status == 500 || error.status == 401 || error.status == 417) {
          err = (error.error && error.error.message) ? error.error.message : "INTERNAL SERVER ERROR";
        } else if (error.status == 200) {
          err = error.error.text;
          if (error.error.text && ((error.error.text).toLowerCase() == 'invalid email') || error.error.text == 'invalid password') {
            alertError = false;
          }
        } else if (error.status == 400) {
          err = error.error;
        }else if(error.status == 403){
          err = error.error.message;
        } else {
          err = error.message;
        }
      } else {
        err = error.err || error.json().message;
      }
    } catch (e) {
      err = error.toString();
    }
    if (err == null || err === '' || err === 'undefined' || err === 'unKnown Error' || error.statusText == 'unKnown Error') {
      err = 'Something wrong, please contact system administrator';
    }
    if (alertError) {
      this.alert(err, 'error')
      throw new Error('');
    } else {
      throw new Error(err);
    }
    return null;
  }

  public alert(Body: any, alertType: any = 'error', titleText?: string) {
    try {
      if (Body instanceof Error) {
        Body = Body.message;
      }
      if (Body != null && Body != '' && Body != 'null') {
        let title = '';
        if (alertType === 'error' || alertType === 'warning') {
          title = ''
        } else if (alertType === 'success') {
          title = 'Saved!'
        } else if (alertType === 'info') {
          title = 'Info';
        }
        let footer = '';
        if (titleText) {
          title = titleText;
        }
        Swal.fire({
          title: title,
          html: Body,
          icon: alertType,
          width: '500px',
          footer: footer,
          confirmButtonText: "Close"
        })
      }
    } catch (ex) {

    }
  }
}
