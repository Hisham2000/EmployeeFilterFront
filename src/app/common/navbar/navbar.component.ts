import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {ServiceCall} from "../../../utilis/service-call.service";
import {ServiceUrl} from "../../../utilis/service-url.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  userDetails: any;

  constructor(private _serviceCall: ServiceCall, private _serviceUrl: ServiceUrl, private _router: Router) {
  }

  logout() {
    let url = this._serviceUrl.baseUrl + this._serviceUrl.logOut;
    this._serviceCall.getOpservable(url, this._serviceCall.getDefaultHeaders(null)).subscribe((response: any)=>{
      debugger
      Swal.fire({
        title: "Log Out",
        width: '500px',
        icon: 'success',
        html: response.message,
        confirmButtonText: "Close"
      });
      localStorage.clear();
      this._router.navigate(['/auth']);
    });

  }

  ngOnInit(): void {
    this.userDetails = this._serviceCall.getLoggedInUser();
  }
}
