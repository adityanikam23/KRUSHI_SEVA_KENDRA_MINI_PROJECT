import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  adminscount : any = 0;

  cropscount : any  = 0

  townscount : any = 0;

  farmerscount : any = 0;

  constructor(private api : ApiService){
  
  }

  ngOnInit(): void {
     this.load();
  }

  load(){
    this.api.get("api/admins").subscribe((result : any)=>{
      this.adminscount = result.length;
      console.log(this.adminscount);
      
    }) ;

    this.api.get("api/crops").subscribe((result : any)=>{
     this.cropscount = result.length;
    });

    this.api.get("api/towns").subscribe((result : any)=>{
      this.townscount = result.length;
    });

    this.api.get("api/farmers").subscribe((result : any)=>{
      this.farmerscount = result.length;
    });

  }

}
