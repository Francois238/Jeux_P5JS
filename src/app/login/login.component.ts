import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CredentialsUser } from '../credentials-user';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public pseudo ='';
  public password ='';
  public message='';

  public credential! : CredentialsUser
  
  public loginForm: UntypedFormGroup;
  public pseudoCrtl: FormControl;
  public passwordCrtl: FormControl;

  constructor(protected router: Router, protected authenticationService : AuthenticationService) { 
    this.pseudoCrtl = new FormControl('')
    this.passwordCrtl = new FormControl('')
    this.loginForm = new UntypedFormGroup({
        pseudo: this.pseudoCrtl,
        password : this.passwordCrtl

    })
  }

  ngOnInit(): void {

    this.pseudoCrtl = new FormControl('')
    this.passwordCrtl = new FormControl('')
    this.loginForm = new UntypedFormGroup({
        pseudo: this.pseudoCrtl,
        password : this.passwordCrtl

    })
  }

  public login(){

    this.pseudo = this.pseudoCrtl.value.trim();
    this.password = this.passwordCrtl.value.trim();

    if(this.pseudo.length == 0 || this.password.length == 0){
      this.message = "Pseudo and password are required";
      return;
    }

    this.credential = { username : this.pseudo, password : this.password}

    this.authenticationService.signIn(this.credential).subscribe({
      next: (response :any)=> {

        this.router.navigate(['/snake']);
        
        console.log(response);
      },
      error: (e) => {
        
        console.error(e)
        this.message = "Pseudo ou password incorrect"
      },
  })
    
  }


}
