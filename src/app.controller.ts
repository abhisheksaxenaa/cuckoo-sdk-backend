import { Body, Controller, Get, Headers, Post, Query, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { EventRequestBody } from '@app/InputMappers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): Record<string, string> {
    return this.appService.getHello();
  }

  @Get('status')
  status(): Record<string, string> {
    return { message: 'success' };
  }

  @Version('1')
  @Get('verify')
  async verify(@Headers() headers): Promise<Record<string, string>> {
    const apiKey = headers['api-key'];
    return await this.appService.verify(apiKey);
  }

  @Version('1')
  @Post('events')
  async registerEvent(@Headers() headers, @Query() query, @Body() body: EventRequestBody): Promise<Record<string, string>> {
    await this.verify(headers);
    const apiKey = headers['api-key'];
    const session_id = query['session_id']
    await this.appService.storeFileToGCS(apiKey, session_id, body);
    return { message: 'completed' };
  }
}
