import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppComponent } from './app.component';
import { OrderListComponent } from './order-list/order-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CurrentOrdersComponent } from './current-orders/current-orders.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { ShowItemsDialogComponent } from './show-items-dialog/show-items-dialog.component';
import { OrderService } from './_services/order.service';
import { MessageService } from './_services/message.service';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';

const appRoutes: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'current', component: CurrentOrdersComponent },
  { path: '**', component: OrderListComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    NavbarComponent,
    CurrentOrdersComponent,
    OrderDialogComponent,
    ShowItemsDialogComponent,
    AddItemDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    OrderService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
