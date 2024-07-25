import {
    Injectable,
    Inject,
    Logger,
    InternalServerErrorException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CollectionReference, Timestamp } from '@google-cloud/firestore';
import { ApplicationDocument } from './application/application.document';

@Injectable()
export class RawReadingsService {
    private logger: Logger = new Logger(RawReadingsService.name);

    constructor(
        @Inject(ApplicationDocument.collectionName)
        private applicationCollection: CollectionReference<ApplicationDocument>,
    ) { }

    async findAll(): Promise<ApplicationDocument[]> {
        const snapshot = await this.applicationCollection.get();
        const apps: ApplicationDocument[] = [];
        snapshot.forEach(doc => apps.push(doc.data()));
        return apps;
    }

    async findApiKey(apiKey: string): Promise<ApplicationDocument | null> {
        const apps: ApplicationDocument[] = await this.findAll();
        const app = apps.find((doc) => {
            if (doc.api_key === apiKey)
                return true;
            return false;
        });
        return app;
    }
}