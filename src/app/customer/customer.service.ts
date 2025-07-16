import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private urls = `${environment.apiUrl}/customers`;
  constructor(private http: HttpClient) { }
  getCustomer(){
    return this.http.get<any[]>(this.urls);
    }

  addCustomer(customer: Customer ): Observable<any> {
    return this.http.post(this.urls, customer);
  }

  deleteCustomer(id:number): Observable<any> {
    return this.http.delete(`${this.urls}/${id}`);
   }

  updateCustomer(customer: Customer): Observable<any> {
    console.log('CCID'+`${customer.CUS_CustomerID}`);
    return this.http.put(`${this.urls}/${customer.CUS_CustomerID}`,customer)
    }
}
