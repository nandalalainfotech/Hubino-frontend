import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})

export class CustomerService {
    
    private customerUrl: string = `${environment.apiUrl}/customercontroller`
    constructor(private http: HttpClient) { }
    getAllCustomer(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.customerUrl + '/list');
    }
    getCustomerById(customerID: string): Observable<Customer> {
        return this.http.get<Customer>(this.customerUrl + '/show/' + customerID);
    }
    createCustomer(customer: Customer): Observable<Customer> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Customer>(this.customerUrl + '/create',
        customer, httpOptions);
    }
    updateCustomer(customer: Customer): Observable<Customer> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<Customer>(this.customerUrl + '/update',
        customer, httpOptions);
    }
    deleteCustomerById(customerID: string): Observable<string> {
        
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<string>(this.customerUrl + '/delete/' + customerID,
            httpOptions);
    }
}









