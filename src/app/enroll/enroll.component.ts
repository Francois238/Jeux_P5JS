import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CredentialsUser } from '../credentials-user';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {

  public pseudo ='';
  public password ='';
  public message='';

  public credential! : CredentialsUser

  public enrollForm: UntypedFormGroup;
  public pseudoCrtl: FormControl;
  public passwordCrtl: FormControl;

  constructor(protected router: Router, protected authenticationService : AuthenticationService) { 
    this.pseudoCrtl = new FormControl('')
    this.passwordCrtl = new FormControl('')
    this.enrollForm = new UntypedFormGroup({
        peudo: this.pseudoCrtl,
        password : this.passwordCrtl

    })
  }

  ngOnInit(): void {

    this.pseudoCrtl = new FormControl('')
    this.passwordCrtl = new FormControl('')
    this.enrollForm = new UntypedFormGroup({
        pseudo: this.pseudoCrtl,
        password : this.passwordCrtl

    })
  }

  public enroll(){

    this.pseudo = this.pseudoCrtl.value.trim();
    this.password = this.passwordCrtl.value.trim();

    console.log("pseudo : " + this.pseudo)
    console.log("password : " + this.password)

    if(this.pseudo.length == 0 || this.password.length == 0){
      this.message = "Pseudo and password are required";
      return;
    }

    this.credential = { username : this.pseudo, password : this.password}

    this.authenticationService.enroll(this.credential).subscribe({
      next: ()=> {
        
          this.router.navigate(['/login'])
      },
      error: (e) => {
        
        console.error(e)
        this.message = "Erreur dans creation de compte"
      },
  })
    
  }

}
