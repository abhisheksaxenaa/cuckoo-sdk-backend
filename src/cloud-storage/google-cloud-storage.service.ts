import {
    Injectable,
    Inject,
    Logger,
    InternalServerErrorException,
} from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudStorageService {
    private logger: Logger = new Logger(CloudStorageService.name);
    private _storage: Storage;
    private _bucketName: string;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.init();
    }

    private init() {
        this._bucketName = this.configService.get('GCS_BUCKET_NAME');
        const gcsProjectId = this.configService.get('GC_PROJECT_ID');
        const clientEmail = this.configService.get('GCS_CLIENT_EMAIL');
        const privateKey = this.configService.get('GCS_CLIENT_PRIVATE_KEY');
        this._storage = new Storage({
            projectId: gcsProjectId,
            credentials: {
                client_email: clientEmail,
                private_key: privateKey
            }
        })
    }

    async store(location: string, data: any): Promise<boolean> {
        try {
            if (!this._storage) {
                this.init();
            }
            const bucket = this._storage.bucket(this._bucketName);
            const file = bucket.file(`${location}/${Date.now()}.json`);
            await file.save(JSON.stringify(data), { contentType: 'application/json' })
            return true;
        } catch (e) {
            this.logger.error(e);
            return false;
        }
    }
}