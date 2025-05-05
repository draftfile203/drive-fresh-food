import { Component, inject,  PLATFORM_ID } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { Menu } from '../services/menu';
import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuCardComponent } from '../menu-card/menu-card.component';
@Component({
  selector: 'app-menu',
  imports: [NgFor,NgIf,CommonModule,FormsModule,MenuCardComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  title:string = 'menu'

  dataService: GetDataService = inject(GetDataService)

  platformId = inject(PLATFORM_ID)

  menuList: Menu[] = []

  filteredMenuList: Menu[] = []

  searchTerm: string = ''

  displayedMenuCount = 6

  constructor(private dataservice: GetDataService) {
    if(isPlatformBrowser(this.platformId)) {
      this.loadMenu();
    }
  }

  async loadMenu(refresh:boolean = false) {
    try{
      this.menuList = await this.dataService.getData(refresh)
      this.filteredMenuList = this.menuList
      console.log(this.menuList)
    }catch(error) {
      console.error('Error fetching menu', error)
    }
  }

  refreshMennu() {
    this.loadMenu(true)
  }

  showMore() {
    this.displayedMenuCount = Math.min(this.displayedMenuCount + 3,this.filteredMenuList.length)
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredMenuList = this.menuList.filter(menu =>
      (menu.name && menu.name.toLowerCase().includes(term)) ||
      (menu.name2 && menu.name2.toLowerCase().includes(term))
    );
  
    this.displayedMenuCount = Math.min(this.filteredMenuList.length, 6);
  }
  

}
