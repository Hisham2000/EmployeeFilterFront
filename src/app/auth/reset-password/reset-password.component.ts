import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import Swal from "sweetalert2";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ServiceCall} from "../../../utilis/service-call.service";
import {ServiceUrl} from "../../../utilis/service-url.service";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  send = false;
  myForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
  });

  constructor(private _serviceCall: ServiceCall, private _serviceUrl: ServiceUrl) {
  }

  resetPassword() {
    debugger
    this.send = true;
    let url = this._serviceUrl.baseUrl + this._serviceUrl.resetPassword;
    let requestBody = {
      "email": this.myForm.get("email")?.value + "",
    }
    this._serviceCall.postObservable(url, requestBody, {}).subscribe((response: any) => {
      Swal.fire({
        title: "Reset Password",
        width: '500px',
        icon: 'success',
        html: 'check your email',
        confirmButtonText: "Close"
      });
    });
    this.send = false;
  }
}
