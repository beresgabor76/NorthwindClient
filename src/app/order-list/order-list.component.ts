import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ShowItemsDialogComponent } from '../show-items-dialog/show-items-dialog.component';
import { OrderDto } from '../_models/OrderDto';
import { MessageService } from '../_services/message.service';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  columnDefs: ColDef[] = [
    { headerName: 'OrderID', field: 'orderID', sortable: true, resizable: true },
    { headerName: 'CustomerID', field: 'customerID', resizable: true },
    { headerName: 'Company Name', field: 'companyName', sortable: true, resizable: true },
    { headerName: 'Order Date', field: 'orderDate',
      cellRenderer: (params: any) => {
        return moment(params.data.orderDate).format('DD/MM/YYYY');
      }, sortable: true, resizable: true
    },
    {
      headerName: 'Required Date', field: 'requiredDate',
      cellRenderer: (params: any) => {
        return moment(params.data.requiredDate).format('DD/MM/YYYY');
      }, sortable: true, resizable: true
    },
    { headerName: 'Freight', field: 'freight', resizable: true },
    { headerName: 'Ship City', field: 'shipCity', resizable: true, },
    { headerName: 'Ship Country', field: 'shipCountry', resizable: true }
  ];
  rowData: Array<OrderDto> = []

  constructor(private orderService: OrderService, private dialog: MatDialog,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
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

  showItems() {
    var selectedRows = this.gridApi.getSelectedRows();        
    if (selectedRows.length == 1) {
      var data = { id: selectedRows[0].orderID };
      this.dialog.open(ShowItemsDialogComponent, { data });
    }
  }
}
