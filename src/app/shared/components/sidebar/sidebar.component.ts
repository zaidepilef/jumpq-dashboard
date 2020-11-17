import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'
import { JumpqService } from 'src/app/services/jumpq.service'
import {BranchOfficeComponent} from 'src/app/modules/branch-office/branch-office.component'
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  tester : BranchOfficeComponent;
  constructor(private auth: AuthService, private jumpqService: JumpqService,private router: Router) { }

  User: any = this.auth.GetToken();
  an_request: any;
  an_response: any;
  userdata: any = {
    };
  nameload: boolean;
  company: any ="";
  ngOnInit(): void {
   this.loaduser();
  }
 

  test(){
    this.router.navigateByUrl('/branchoffice', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/branchoffice']);
  }); 
      
  }
  loaduser() {
    var usersend = {
      data : this.User
    }
    this.jumpqService.getUserData(usersend).subscribe(
      res => {
         this.an_response = res;
         this.userdata = this.an_response.user;
      
         this.Company();
      }, err => console.error(err)
    );
  }

  Company() {
    var usersend = {
      id : this.userdata.company
    }
    this.jumpqService.cargarcompañia(usersend).subscribe(
      res => {
         this.an_response = res;
         this.company = this.an_response.companies.company_name;
      }, err => console.error(err)
    );
  }

}
