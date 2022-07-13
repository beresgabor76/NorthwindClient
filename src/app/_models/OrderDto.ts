export class OrderDto {
  public orderID!: number;
  public customerID!: string;
  public companyName!: string;
  public orderDate!: Date;
  public requiredDate!: Date;
  public freight!: number;
  public shipCity!: string;
  public shipCountry!: string;
}
