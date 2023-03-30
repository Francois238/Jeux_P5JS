import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {

  public pseudo ='';
  public password ='';
  public message='';

  public enrollForm: UntypedFormGroup;
  public pseudoCrtl: FormControl;
  public passwordCrtl: FormControl;

  constructor() { 
    this.pseudoCrtl = new FormControl('')
    this.passwordCrtl = new FormControl('')
    this.enrollForm = new UntypedFormGroup({
        mail: this.pseudoCrtl,
        password : this.passwordCrtl

    })
  }

  ngOnInit(): void {

    this.pseudoCrtl = new FormControl('')
    this.passwordCrtl = new FormControl('')
    this.enrollForm = new UntypedFormGroup({
        mail: this.pseudoCrtl,
        password : this.passwordCrtl

    })
  }

  public enroll(){}

}
