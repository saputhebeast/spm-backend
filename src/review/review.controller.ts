import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';

@Controller('review')
@UseGuards(JwtGuard)
export class ReviewController {
  constructor() {}
}
