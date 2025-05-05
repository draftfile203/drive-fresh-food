import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../services/menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://66f4a17977b5e889709a05ef.mockapi.io/menu'

  constructor(private http:HttpClient) { }

  addMenu(menu:Menu): Observable<any> {
    return this.http.post(`${this.apiUrl}`, menu)
  }

  updateMenu(id: string, menu: Menu): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`,menu)
  }

  deleteMenu(id:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
