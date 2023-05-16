import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logindata: any
  changedata : any;
  constructor(private apiservice: ApiService, private route: Router) {

  }

  ngOnInit(): void {
    this.logindata = new FormGroup({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required]))
    });

    if(localStorage.getItem("usertype")!= null){
      this.route.navigate(['admin/dashboard']);
    }
    else{
      this.route.navigate(['/']);
    }

  }

  

  login(data: any) {
    this.apiservice.post("api/authentication/login", data).subscribe((result: any) => {
      if (result.length > 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem("name", result[0].name);
        localStorage.setItem("username", result[0].username);
        localStorage.setItem("usertype", "admin");
        localStorage.setItem("token", result[0].TokenString);
        this.route.navigate(['admin/dashboard']);
      }
      else {
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      }
     
    })


  }

}
