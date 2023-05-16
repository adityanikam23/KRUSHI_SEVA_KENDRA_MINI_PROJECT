import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.css']
})
export class FarmersComponent implements OnInit {
  formdata: any;
  farmers: any;
  towns: any;

  constructor(private api: ApiService, private router: ActivatedRoute) {
    this.api.get("api/Towns").subscribe((result: any) => {
      this.towns = result;
    })

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl("", Validators.compose([Validators.required])),
      mobileno: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl(""),
      townid: new FormControl(0, Validators.compose([Validators.required])),
    })

    this.api.get("api/Farmers").subscribe((result: any) => {
      this.farmers = result;
    })

  }


  Save(data: any) {
    this.api.post("api/Farmers", data).subscribe((result: any) => {
      this.load();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Saved successfully'
      })
    })
  }

  clear(){
    this.formdata.value = "";
  }

  edit(id: any) {
    this.api.get("api/farmers/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        name: result.name,
        address: result.address,
        mobileno: result.mobileno,
        email: result.email
      });
    })
  }

  delete(id: any) {
    this.api.delete("api/farmers/" + id).subscribe((result: any) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.load();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    })
  }

}
