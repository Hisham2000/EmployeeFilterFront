import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceUrl} from "../../../utilis/service-url.service";
import {ServiceCall} from "../../../utilis/service-call.service";
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MultiSelectModule, FormsModule, DialogModule, ReactiveFormsModule, RippleModule, InputTextModule, ToastModule],
  templateUrl: './home.component.html',
  providers: [MessageService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: any;
  departments: any;
  managers: any;
  contractTypes: any;
  isEdit = false;
  clonedUser: { [s: string]: any } = {};

  constructor(private _serviceUrl: ServiceUrl,
              private _serviceCall: ServiceCall,
              protected _router: Router,
              private _messageService: MessageService) {
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

  ngOnInit() {
    this.getALlUsers();
    this.getAllDepartments();
    this.getAllContractType();
  }

  getALlUsers() {
    let url = this._serviceUrl.baseUrl + this._serviceUrl.getAllUsers;
    this._serviceCall.getOpservable(url, this._serviceCall.getDefaultHeaders(null)).subscribe((response: any) => {
      this.users = response;
      this.managers = [];
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].role.name.toLowerCase() == "manager") {
          this.managers.push(this.users[i]);
        }
      }
    });
  }

  getAllDepartments() {
    let url = this._serviceUrl.baseUrl + this._serviceUrl.getAllDepartement;
    this._serviceCall.getOpservable(url, this._serviceCall.getDefaultHeaders(null)).subscribe((response: any) => {
      this.departments = response;
    })
  }

  getAllContractType() {
    let url = this._serviceUrl.baseUrl + this._serviceUrl.getAllContractType;
    this._serviceCall.getOpservable(url, this._serviceCall.getDefaultHeaders(null)).subscribe((response: any) => {
      this.contractTypes = response;
    })

  }

  clear(dt1: Table) {
    dt1.clear();
  }

  openEdit(user: any) {
    debugger
    this.isEdit = true;
  }

  submitEdit() {

  }

  onRowEditInit(user: any) {
    debugger
    this.clonedUser[user.id as string] = {...user};
  }

  onRowEditSave(user: any) {
    let url = this._serviceUrl.baseUrl + this._serviceUrl.updateUser;
    this._serviceCall.postObservable(url, user, this._serviceCall.getDefaultHeaders(null)).subscribe((response: any) => {
      delete this.clonedUser[response.id as string];
      this._messageService.add({severity: 'success', summary: 'Success', detail: 'Employee is updated'});
    });
  }

  onRowEditCancel(user: any, index: number) {
    this.users[index] = this.clonedUser[user.id as string];
    delete this.clonedUser[user.id as string];
  }
}
