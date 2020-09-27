import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'jumpq-dashboard';

  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    /** spinner starts on init */
    
  }
}
