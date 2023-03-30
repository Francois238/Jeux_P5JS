import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public pseudo ='';
  public password ='';
  public message='';

  public loginForm: UntypedFormGroup;
  public pseudoCrtl: FormControl;
  public passwordCrtl: FormControl;

  constructor() { 
    this.pseudoCrtl = new FormControl('')
    this.passwordCrtl = new FormControl('')
    this.loginForm = new UntypedFormGroup({
        mail: this.pseudoCrtl,
        password : this.passwordCrtl

    })
  }

  ngOnInit(): void {

    this.pseudoCrtl = new FormControl('')
    this.passwordCrtl = new FormControl('')
    this.loginForm = new UntypedFormGroup({
        mail: this.pseudoCrtl,
        password : this.passwordCrtl

    })
  }

  public login(){}


}
