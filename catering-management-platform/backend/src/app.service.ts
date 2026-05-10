import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Saffron & Sage Backend API is running!';
  }
}
