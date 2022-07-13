import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { ShowItemsDialogComponent } from '../show-items-dialog/show-items-dialog.component';
import { OrderDto } from '../_models/OrderDto';
import { MessageService } from '../_services/message.service';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-current-orders',
  templateUrl: './current-orders.component.html',
  styleUrls: ['./current-orders.component.css']
})
export class CurrentOrdersComponent implements OnInit {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  columnDefs: ColDef[] = [
    { headerName: 'OrderID', field: 'orderID', sortable: true, resizable: true },
    { headerName: 'CustomerID', field: 'customerID', resizable: true },
    { headerName: 'Company Name', field: 'companyName', sortable: true, resizable: true },
    { headerName: 'Order Date', field: 'orderDate', sortable: true, resizable: true },
    { headerName: 'Required Date', field: 'requiredDate', sortable: true, resizable: true },
    { headerName: 'Freight', field: 'freight', resizable: true },
    { headerName: 'Ship City', field: 'shipCity', resizable: true, },
    { headerName: 'Ship Country', field: 'shipCountry', resizable: true },
  ];
  rowData: Array<OrderDto> = []
  
  constructor(private orderService: OrderService, private dialog: MatDialog,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.orderService.getCurrentOrders().subscribe(
      orders => {
        this.rowData = orders;
      },
      error => { console.log(error) });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.onResize();
  }

  onResize() {
    const allColumnIds: string[] = [];
    this.gridColumnApi.getAllColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    this.gridApi.sizeColumnsToFit();
  }

  createOrder() {
    let dialogRef = this.dialog.open(OrderDialogComponent);
    dialogRef.afterClosed().subscribe(() => this.refreshData());
  }

  deleteOrders() {
      var selectedRows = this.gridApi.getSelectedRows();
      selectedRows.forEach(
        row => this.orderService.deleteOrder(row.orderID).subscribe(
          response => {
            this.messageService.showSuccess(response);
            this.refreshData();
          },
          error => console.log(error)
        )
      )
  }

  addItems() {
    var selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length == 1) {
      var data = { orderID: selectedRows[0].orderID };
      this.dialog.open(AddItemDialogComponent, { data });
    }
  }

  showItems() {
    var selectedRows = this.gridApi.getSelectedRows();    
    if (selectedRows.length == 1) {
      var data = { id: selectedRows[0].orderID };
      this.dialog.open(ShowItemsDialogComponent, { data });
    }
  }
  
}
