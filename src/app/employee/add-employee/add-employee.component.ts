import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ServiceCall} from "../../../utilis/service-call.service";
import {ServiceUrl} from "../../../utilis/service-url.service";
import {Router} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {

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

  addNewEmployee() {

  }
}
