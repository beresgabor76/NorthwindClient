import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CellEditRequestEvent, ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CreateItemDto } from '../_models/CreateItemDto';
import { OrderItemDto } from '../_models/OrderItemDto';
import { MessageService } from '../_services/message.service';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-show-items-dialog',
  templateUrl: './show-items-dialog.component.html',
  styleUrls: ['./show-items-dialog.component.css']
})
export class ShowItemsDialogComponent implements OnInit {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  columnDefs: ColDef[] = [
    { headerName: 'ProductID', field: 'productID', sortable: true, resizable: true },
    { headerName: 'Product Name', field: 'productName', sortable: true, resizable: true },
    { headerName: 'QuantityPerUnit', field: 'quantityPerUnit', resizable: true },
    { headerName: 'Unit Price', field: 'unitPrice', resizable: true },
    { headerName: 'Quantity', field: 'quantity', resizable: true, editable: true }
  ];
  rowData: Array<OrderItemDto> = []

  constructor(public dialogRef: MatDialogRef<ShowItemsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.refreshData();    
  }

  refreshData() {
    this.orderService.getOrderItems(this.data.id).subscribe(
      items => {
        this.rowData = items;        
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

  onCellEditRequest(event: CellEditRequestEvent) {
    const field = event.colDef.field;
    if (field == 'quantity') {
      const item = { ...event.data };

      var dto: CreateItemDto = new CreateItemDto()
      dto.orderID = this.data.id;
      dto.productID = item.productID;
      dto.quantity = event.newValue;
      
      this.orderService.updateItem(dto).subscribe(
        () => {
          this.refreshData();          
          this.messageService.showSuccess('Ordered quantity has been modified.');
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}
