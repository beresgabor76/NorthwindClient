import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { CustomerDto } from '../_models/CustomerDto';
import { MessageService } from '../_services/message.service';
import { OrderService } from '../_services/order.service';
import { CreateOrderDto } from '../_models/CreateOrderDto';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {  
  customers$: Observable<CustomerDto[]> = new Observable();
  order: CreateOrderDto = new CreateOrderDto();
  datepickerInput: any;
  customerList: CustomerDto[] = [];

  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>,    
    private orderService: OrderService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.customers$ = this.orderService.getCustomers();
    this.orderService.getCustomers().subscribe(response => this.customerList = response);
  }
  
  onDateChange(event: MatDatepickerInputEvent<Date>) {        
    this.order.requiredDate = event.value as Date;
  }
  
  onSubmit() {
    this.customerList.forEach(cr => {
      if (cr.customerID == this.order.customerID) {
        this.order.shipCity = cr.city;
        this.order.shipCountry = cr.country;
      }
    });
    this.orderService.addNewOrder(this.order).subscribe(
      response => {
        this.messageService.showSuccess(response);
        this.dialogRef.close();
      },
      error => {        
        console.log(error);         
      }      
    );
  }
}
