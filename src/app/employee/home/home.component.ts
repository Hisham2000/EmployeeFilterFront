import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServiceUrl} from "../../../utilis/service-url.service";
import {ServiceCall} from "../../../utilis/service-call.service";
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MultiSelectModule, FormsModule, DialogModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  users: any;
  departments: any;
  managers: any;
  contractTypes: any;
  isEdit = false;
  constructor(private _serviceUrl: ServiceUrl, private _serviceCall: ServiceCall, protected _router: Router) {
  }

  ngOnInit() {
    this.getALlUsers();
    this.getAllDepartments();
    this.getAllContractType();
  }

  getALlUsers(){
    let url = this._serviceUrl.baseUrl + this._serviceUrl.getAllUsers;
    this._serviceCall.getOpservable(url, this._serviceCall.getDefaultHeaders(null)).subscribe((response: any)=>{
      this.users = response;
      this.managers = [];
      for(let i = 0; i < this.users.length; i++){
        if(this.users[i].role.name.toLowerCase() == "manager"){
          this.managers.push(this.users[i]);
        }
      }
    });
  }

  getAllDepartments(){
    let url = this._serviceUrl.baseUrl + this._serviceUrl.getAllDepartement;
    this._serviceCall.getOpservable(url, this._serviceCall.getDefaultHeaders(null)).subscribe((response: any)=>{
      this.departments = response;
    })
  }

  getAllContractType(){
    let url = this._serviceUrl.baseUrl + this._serviceUrl.getAllContractType;
    this._serviceCall.getOpservable(url, this._serviceCall.getDefaultHeaders(null)).subscribe((response: any)=>{
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
}
