import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
  }

  onClickMe() {
    console.log('logout');

    this.spinner.show();
  
    this.auth.Logout()

  }


}
