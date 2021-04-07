import { Component } from '@angular/core';
import { AppTranslateService } from './services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'address-book';

  constructor(private translate: AppTranslateService) {
    
  }
}
