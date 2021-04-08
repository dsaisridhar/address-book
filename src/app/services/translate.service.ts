import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService {

  constructor(private translate: TranslateService) {
    const lang = window.navigator.language || 'en';
    this.translate.setDefaultLang(lang);
  }

  changeLanguage(lang) {
    this.translate.use(lang);
  }


}
