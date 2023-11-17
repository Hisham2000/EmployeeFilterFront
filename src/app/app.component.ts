import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'EmployeeFilter';
  loader = false;

  constructor(private _router: Router) {
  }

  ngOnInit(): void {
    this._router.events.subscribe( ev => {
      if(ev instanceof NavigationStart){
        this.loader = true;
      }
      if(ev instanceof NavigationEnd || ev instanceof  NavigationCancel || ev instanceof NavigationError){
        this.loader = false;
      }
    });

  }
}
