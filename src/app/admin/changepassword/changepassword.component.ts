import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  adminid: any;

  formdata: any;

  opassword: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.adminid = route.snapshot.paramMap.get("adminid");
    console.log(this.adminid);

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.formdata = new FormGroup({
      id: new FormControl(this.adminid),
      oldpassword: new FormControl("", Validators.compose([Validators.required])),
      newpassword: new FormControl("", Validators.compose([Validators.required]))
    });

  }

  Save(data: any) {
    this.api.put("api/authentication/changepassword/" + this.adminid, data).subscribe((result: any) => {
      this.formdata.patchValue({
        oldpassword: result.oldpassword,
        newpassword: result.newpassword
      });
    })

  }

  clear() {

  }

}
