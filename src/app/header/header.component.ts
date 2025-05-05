import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet,NgIf,TranslatePipe,TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  selectedLanguage: string = 'en'
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(this.selectedLanguage)
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  swichLanguage(lang:string) {
    this.translateService.use(lang)
    this.selectedLanguage = lang;
  }
}
