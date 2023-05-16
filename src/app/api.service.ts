import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "https://localhost:7105/";
  constructor(private http: HttpClient, private route: Router) {

  }

  get(url: string) {
    return this.http.get(this.baseurl + url, {headers : this.getHeader()});
  }

  post(url: string, data: any) {
    return this.http.post(this.baseurl + url, data, {headers : this.getHeader()});
  }

  put(url: string, data: any) {
    return this.http.put(this.baseurl + url, data, {headers : this.getHeader()});
  }

  delete(url: string) {
    return this.http.delete(this.baseurl + url, {headers : this.getHeader()});
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/']);

  }

  getHeader() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    });
    return reqHeader;
  }

}
