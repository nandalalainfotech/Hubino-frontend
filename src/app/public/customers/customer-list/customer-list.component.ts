import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit {

    @ViewChild('formDirective') private formDirective!: NgForm;
    dataSaved = false;
    customerForm: FormGroup | any;
    allCustomers?: Observable<Customer[]>;
    employeeIdUpdate: any;
    massage: any;
    insertUser: string = "";
    insertDatetime: Date | any;

    constructor(private formbulider: FormBuilder, private customerService: CustomerService) { }

    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    ngOnInit() {
        this.customerForm = this.formbulider.group({
            customerID: ['', [Validators.required]],
            cName: ['', [Validators.required]],
            emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])],
            pNumber: ['', [Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.minLength(10), Validators.maxLength(10)]],
            gender: ['', [Validators.required]]
        });
        this.loadAllCustomers();
    }

    loadAllCustomers() {
        this.allCustomers = this.customerService.getAllCustomer();
    }

    onFormSubmit(data: any) {
        this.markFormGroupTouched(this.customerForm);
        this.dataSaved = false;
        const customer = this.customerForm.value;
        this.formDirective.resetForm();
        this.CreateCustomer(customer);
        this.customerForm.reset();
        this.massage = null;
        this.dataSaved = false;
    }

    edit(id: any) {
        this.customerService.getCustomerById(id).subscribe(employee => {
            this.massage = null;
            this.dataSaved = false;
            this.employeeIdUpdate = employee.customerID;
            this.customerForm.controls['customerID'].setValue(employee.customerID)
            this.customerForm.controls['cName'].setValue(employee.cName);
            this.customerForm.controls['emailId'].setValue(employee.emailId);
            this.customerForm.controls['pNumber'].setValue(employee.pNumber);
            this.customerForm.controls['gender'].setValue(employee.gender);

        });
    }
    CreateCustomer(customer: Customer) {

        if (this.employeeIdUpdate == null) {
            this.customerService.createCustomer(customer).subscribe(
                () => {
                    this.dataSaved = true;
                    alert('Record saved Successfully');
                    this.loadAllCustomers();
                    this.employeeIdUpdate = null;

                }

            );
        } else {
            customer.customerID = this.employeeIdUpdate;
            this.customerService.updateCustomer(customer).subscribe(() => {
                this.dataSaved = true;
                alert('Record Updated Successfully');
                this.loadAllCustomers();
                this.employeeIdUpdate = null;
                this.customerForm.resetForm();
            });
        }
    }

    delete(id: any) {
        if (confirm("Are you sure you want to delete this ?")) {
            this.customerService.deleteCustomerById(id).subscribe(() => {
                this.dataSaved = true;
                this.massage = 'Record Deleted Succefully';
                this.loadAllCustomers();
                this.employeeIdUpdate = null;
                this.customerForm.reset();

            });
        }
    }
    resetForm() {
    }


}
