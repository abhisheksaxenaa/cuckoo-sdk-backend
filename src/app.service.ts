import { HttpException, Injectable } from '@nestjs/common';
import { RawReadingsService } from './models/application.service';
import { generateRandomBase64 } from './helper/helper.utils';
import { EventRequestBody } from '@app/InputMappers';
import { CloudStorageService } from './cloud-storage/google-cloud-storage.service';

@Injectable()
export class AppService {
  constructor(
    private readonly cloudStorageService: CloudStorageService,
    private readonly rawReadingService: RawReadingsService
  ) {
  }
  getHello(): Record<string, string> {
    return { message: 'Hello, World!' };
  }
  async verify(apiKey: string): Promise<Record<string, string>> {
    if (!apiKey) {
      throw new HttpException('Api Key is missing', 400);
    }
    const appData = await this.rawReadingService.findApiKey(apiKey);

    if (!appData)
      throw new HttpException('API Key not found', 404, { description: '' });

    const sessionId = generateRandomBase64();
    return {
      session_id: sessionId,
      message: 'Session verified'
    };
  }
  async storeFileToGCS(apiKey: string, sessionId: string, data: EventRequestBody): Promise<boolean> {
    await this.cloudStorageService.store(`${apiKey}/${sessionId}`, data.data);
    return true;
  }
}
