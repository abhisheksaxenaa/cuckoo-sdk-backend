import { Timestamp } from '@google-cloud/firestore';

export class ApplicationDocument {
    static collectionName = 'applications';

    api_key: string;
    name: string;
    domain: string;
    user_id: string;
    created_at: Timestamp;
}