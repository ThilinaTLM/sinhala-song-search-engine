import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): string {
    return `
    Welcome to the Song API!
    `;
  }
}
