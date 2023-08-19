import { Package } from '@prisma/client';
import { PackageDto } from '../../package/dto';

export function mapPackageToPackageDto(pkg: Package): PackageDto {
  return {
    id: pkg.id,
    name: pkg.name,
    period: pkg.period,
    price: pkg.price,
    description: pkg.description,
    image: pkg.image,
    isActive: pkg.isActive,
    createdAt: pkg.createdAt,
    updatedAt: pkg.updatedAt,
  };
}
