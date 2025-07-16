import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  uname = '';
  psw = '';
  errorMessage = '';
  constructor( private loginService: LoginService, private router:Router) { }

  ngOnInit() {
  }

  login() {
    const credentials = { uname:this.uname, psw:this.psw };
    this.loginService.login(credentials).subscribe({
      next: (res)=>{
        this.router.navigate(['/dashboard']);
        },
      error: (err)=>{
        this.errorMessage = (err.error && err.error.message) ? err.error.message : 'Login failed';
        setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      })

    }

}
