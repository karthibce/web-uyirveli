import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@Injectable({ providedIn: 'root' })
export class HomeComponent implements OnInit {
  showSpinner = true;

  constructor(private http: HttpClient) { }
  users = [];
  ngOnInit() {
    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
   this.getUsers().subscribe((data: any) => {
        this.users = data;
        console.log(this.users);
      });

    this.getUser2().subscribe((data: any) => {
      this.user2 = data;
      console.log(this.user2);
      });
  }

getUsers() {
    return this.http.get(`${environment.apiUrl}/api/users`);
  }

getUser2(){
  return this.http.get(`${environment.apiUrl}/api/users/new`);
  }

}
