import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-towns',
  templateUrl: './towns.component.html',
  styleUrls: ['./towns.component.css']
})
export class TownsComponent implements OnInit {
  
  formdata: any;
  towns: any;

  constructor(private api: ApiService) {
    
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required]))
    })

    this.api.get("api/Towns").subscribe((result: any) => {
      this.towns = result;
    })

  }

  Save(data: any) {
    this.api.post("api/Towns", data).subscribe((result: any) => {
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
    this.api.get("api/Towns/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        name: result.name
      });
    })
  }

  delete(id: any) {
    this.api.delete("api/Towns/" + id).subscribe((result: any) => {
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
