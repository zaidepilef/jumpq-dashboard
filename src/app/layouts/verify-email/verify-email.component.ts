import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.sass']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private register: RegisterService, private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.spinner.show();
    let rare = this.route.snapshot.paramMap.get('rare');

    console.log('rare : ', rare);
    
  }

}
