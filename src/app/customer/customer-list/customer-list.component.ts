import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers : any[] = [];
  filteredCustomers : any[] = [];
  searchText = '';
  currentPage = 1;
  pageSize = 10;
  showModal = false;
  newCustomer:Customer = {
    CUS_CustomerName: '',
    CUS_PhoneNumber: '',
    CUS_Village: '',
    CUS_Block: '',
    CUS_District: '',
    CUS_CreatedBy: 1,
    };

  constructor(private customerService : CustomerService) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers(){
    this.customerService.getCustomer().subscribe((data)=>{
      this.customers = data;
      this.filteredCustomers = data;
      })
    }

  onSearchChange(): void{
    const query = this.searchText.trim();
    if (query === ''){
        this.filteredCustomers = this.customers;
      }
    else {
      console.log(this.filteredCustomers);
      this.filteredCustomers = this.customers.filter(customer=>customer.CUS_PhoneNumber.includes(query));
    }
  this.currentPage = 1;
  }
  get paginatedCustomers(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredCustomers.slice(startIndex, startIndex + this.pageSize);
  }

get totalPages(): number[] {
  if (!this.filteredCustomers || !this.pageSize) return [];
  const pageCount = Math.ceil(this.filteredCustomers.length / this.pageSize);
  return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  openAddCustomer(): void {
    this.newCustomer = {
      CUS_CustomerName: '',
      CUS_PhoneNumber: '',
      CUS_Village: '',
      CUS_Block: '',
      CUS_District: '',
      CUS_CreatedBy: 1
    };
    this.showModal = true;
  }
  closeModal() {
      this.showModal = false;
    }
  addCustomer(){
    if(this.newCustomer.CUS_CustomerID){
      this.customerService.updateCustomer(this.newCustomer).subscribe({
        next: (res)=>{
          this.loadCustomers();
          this.closeModal();
          },
        error: (err)=>{
          console.error('Error Updating Customer', err);
          }
        });
      }
    else{
      this.customerService.addCustomer(this.newCustomer).subscribe({
        next: (res)=>{
           this.loadCustomers();
           this.closeModal();
          },
        error: (err)=>{
          console.error('Error Adding Customer', err);
          }
        });
      }
    }
  deleteCustomer(id:number):void{
    this.customerService.deleteCustomer(id).subscribe({
      next: ()=>{
        this.loadCustomers();
        }
      });
    }
  openEditCustomer(customer:Customer):void{
    this.newCustomer = { ...customer };
    this.showModal = true;
    }

}
