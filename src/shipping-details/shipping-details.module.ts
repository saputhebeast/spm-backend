import { Module } from '@nestjs/common';
import { ShippingDetailsController } from './shipping-details.controller';
import { ShippingDetailsService } from './shipping-details.service';
import { ShippingDetailsRepository } from './shipping-details.repository';

@Module({
  controllers: [ShippingDetailsController],
  providers: [ShippingDetailsService, ShippingDetailsRepository],
})
export class ShippingDetailsModule {}
