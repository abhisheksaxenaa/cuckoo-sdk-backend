import { ApplicationDocument } from "src/models/application/application.document";

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [
    ApplicationDocument.collectionName
];
