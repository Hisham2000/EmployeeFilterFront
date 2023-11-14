import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServiceCall} from "../../../utilis/service-call.service";
import {ServiceUrl} from "../../../utilis/service-url.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  send = false;

  constructor(private _serviceCall: ServiceCall,
              private _serviceUrl: ServiceUrl,
              private _router: Router,) {
  }

  myForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(9)
    ])
  });


  login() {
    this.send = true;
    let url = this._serviceUrl.baseUrl + this._serviceUrl.login;
    let requestBody = {
      "email": this.myForm.get("email")?.value + "",
      "password": this.myForm.get("password")?.value + ""
    };
    this._serviceCall.postObservable(url, requestBody, {}).subscribe((response: any) => {
      localStorage.setItem("Authorization", "Bearer " + response.token);
      this._router.navigate(['/employee']);

      this.send = false;
    });
    this.send = false;
  }
}
