import { Component, Input } from '@angular/core';
import { Menu } from '../services/menu';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-menu-card',
  imports: [],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.css'
})
export class MenuCardComponent {

  @Input()  menu!:Menu

  menuList: Menu [] = []

  constructor(private getDataService: GetDataService) {}

  async ngOnInIt(): Promise<void> {
    try {
      this.menuList = await this.getDataService.getData();
    } catch(error) {
      console.error('Error fetching characters:', error);
    }
  }

}
