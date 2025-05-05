import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Menu } from '../services/menu';
import { AdminService } from '../adminServices/admin.service';
import { GetDataService } from '../services/get-data.service';
import { response } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-panel',
  imports: [NgFor,ReactiveFormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit{

  menuForm: FormGroup
  menu: Menu[] = []
  selectedMenuId: string | null = null

  constructor(private fb: FormBuilder, private adminService:AdminService,private getDataSerivce:GetDataService) {

    this.menuForm = this.fb.group({
       image: [''],
       name: [''],
       name2: ['']
    })
  }

  ngOnInit(): void {
    this.fetchMenu()
  }

  fetchMenu(): void {
    const cachedData = localStorage.getItem('menuData')

    if(cachedData) {
      this.menu = JSON.parse(cachedData)
    } else {
      this.getDataSerivce.getData().then((menu) => {
        this.menu = menu
      })
    }
  }

  onAdd(): void {
    const newMenu: Menu = this.menuForm.value
    this.adminService.addMenu(newMenu).subscribe(response=> {
      console.log('Meal added:', response)
      this.menuForm.reset()
      this.fetchMenu()
      Swal.fire({
        title: "SUCCESS",
        text: "საჭმელი დაემატა",
        icon: "success",
        background: "#1d1819",
        color: "#f5f5dc",
        iconColor: "#808080",
        confirmButtonColor: "#808080"
      });
    })
  }

  onUpdate(): void {
    if(this.selectedMenuId) {
      const updatedMenu: Menu = this.menuForm.value
      this.adminService.updateMenu(this.selectedMenuId,updatedMenu).subscribe(response => {
        console.log('Meal updated:', response)
        this.menuForm.reset()
        this.selectedMenuId = null
        this.fetchMenu()
        Swal.fire({
          title: "SUCCESS",
          text: "საჭმელი შეიცვალა",
          icon: "success",
          background: "#1d1819",
          color: "#f5f5dc",
          iconColor: "#808080",
          confirmButtonColor: "#808080"
        });
      })
    }
  }

  onDelete(): void {
    if(this.selectedMenuId) {
      this.adminService.deleteMenu(this.selectedMenuId).subscribe(() => {
        console.log('Meal deleted')
        this.menuForm.reset()
        this.selectedMenuId = null
        this.fetchMenu()
        Swal.fire({
          title: "complete",
          text: "საკვები წაიშალა",
          icon: "error",
          background: "#1d1819",
          color: "#f5f5dc",
          iconColor: "#808080",
          confirmButtonColor: "#808080"
        });
      })
    }
  }

  selectMenu(menu: Menu,id:string): void {
    this.selectedMenuId = id
    this.menuForm.patchValue(menu)
  }
}
