import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CreateItemDto } from '../_models/CreateItemDto';
import { ProductDto } from '../_models/ProductDto';
import { MessageService } from '../_services/message.service';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent implements OnInit {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;  
  quantity: number = 0;

  columnDefs: ColDef[] = [
    { headerName: 'ProductID', field: 'productId', sortable: true, resizable: true },
    { headerName: 'Product Name', field: 'productName', sortable: true, resizable: true },
    { headerName: 'QuantityPerUnit', field: 'quantityPerUnit', resizable: true },
    { headerName: 'Unit Price', field: 'unitPrice', resizable: true },
    { headerName: 'Units In Stock', field: 'unitsInStock', resizable: true }
  ];
  rowData: Array<ProductDto> = []

  constructor(public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.orderService.getProducts().subscribe(
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

  onSubmit() {
    var selectedRows = this.gridApi.getSelectedRows();   
    if (selectedRows.length == 1) {
      var createItemDto = new CreateItemDto();
      createItemDto.orderID = this.data.orderID;
      createItemDto.productID = selectedRows[0].productId;
      createItemDto.quantity = this.quantity;
      this.orderService.addItemToOrder(createItemDto).subscribe(
        response => { this.messageService.showSuccess(response)
                      this.dialogRef.close(); },
        error => console.log(error));
    }
  }
}
