import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  formdata: any;

  farmerid: any;

  crops: any

  farmerdata: any;

  rdata: any
  
  recommendationcount : any;
  constructor(private api: ApiService, private router: ActivatedRoute) {
    this.farmerid = router.snapshot.paramMap.get("farmerid");
    this.api.get("api/crops").subscribe((result: any) => {
      this.crops = result;
    })


  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.formdata = new FormGroup({
      rdate: new FormControl("", Validators.compose([Validators.required])),
      message: new FormControl("", Validators.compose([Validators.required])),
      cropid: new FormControl(0, Validators.compose([Validators.required])),
      farmerid: new FormControl(this.farmerid),
      id: new FormControl(0)
    });

    this.api.get("api/farmers/" + this.farmerid).subscribe((result: any) => {
      this.farmerdata = result;
    });

    this.api.get("api/recommendations/" + this.farmerid).subscribe((result: any) => {
      this.rdata = result;
    })

  }


  Save(data: any) {
    this.api.post("api/recommendations", data).subscribe((result: any) => {
      this.load();
      this.recommendationcount + 1;
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
    });
  }

  clear() {
    this.formdata.value = "";
  }

  edit(id: any) {
    this.api.get("api/recommendations/" + this.farmerid + "/" + id).subscribe((result: any) => {
      console.log(result);
      this.formdata.patchValue({
        rdate: result.rdate,
        message: result.message,
      })
    })
  }

  delete(id: any) {
    this.api.delete("api/recommendations/" + id).subscribe((result: any) => {
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
          this.recommendationcount - 1;
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
