import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = `${environment.apiUrl}/api/login`;
  constructor(private http: HttpClient) { }

  login(credentials: { uname: string; psw: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials)
    }
}
