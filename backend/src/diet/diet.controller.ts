import { Controller, Get } from '@nestjs/common';

@Controller('diet')
export class DietController {
  @Get()
  getDiet() {
    return { message: 'API funcionando 🚀' };
  }
}
