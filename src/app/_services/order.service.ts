import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateOrderDto } from '../_models/CreateOrderDto';
import { OrderDto } from '../_models/OrderDto';
import { CustomerDto } from '../_models/CustomerDto';
import { OrderItemDto } from '../_models/OrderItemDto';
import { ProductDto } from '../_models/ProductDto';
import { CreateItemDto } from '../_models/CreateItemDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getOrders() {
    return this.http.get<OrderDto[]>(this.baseUrl + 'order/all');
  }

  getCurrentOrders() {
    return this.http.get<OrderDto[]>(this.baseUrl + 'order/current');
  }

  getCustomers() {
    return this.http.get<CustomerDto[]>(this.baseUrl + 'order/customers')
  }

  addNewOrder(dto: CreateOrderDto) {
    return this.http.post<string>(this.baseUrl + 'order', dto);
  }

  deleteOrder(id: number) {
    return this.http.delete<string>(this.baseUrl + 'order/' + id);
  }

  getOrderItems(id: number) {
    return this.http.get<OrderItemDto[]>(this.baseUrl + 'order/items/' + id);
  }

  getProducts() {
    return this.http.get<ProductDto[]>(this.baseUrl + 'order/products');
  }

  addItemsToOrder(dto: CreateItemDto) {
    return this.http.post<string>(this.baseUrl + 'order/item', dto);
  }

}
