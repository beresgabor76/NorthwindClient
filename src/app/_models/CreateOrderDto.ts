export class CreateOrderDto {  
  public customerID!: string;
  public requiredDate!: Date;
  public freight!: number;
  public shipCity!: string;
  public shipCountry!: string;
}
