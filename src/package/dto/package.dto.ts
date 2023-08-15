export class PackageDto {
  id: number;
  name: string;
  period: number;
  price: number;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
