import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  name : any;

  constructor(private api : ApiService){

  }
  
  ngOnInit(): void {
    this.name = localStorage.getItem("name")
  }

  logout(){
    this.api.logout();
  }

}
