export class CreateItemDto {
  public orderID!: number;
  public productID!: number;  
  public quantity!: number;
  public discount: number = 0;
}
