import * as crypto from 'crypto';

export function generateRandomBase64(length = 64) {
    // Generate random bytes using crypto module
    const randomBytes = crypto.randomBytes(length);

    // Encode the byte array in base64
    const encodedString = randomBytes.toString('base64').replaceAll(/[^a-zA-Z0-9]/gi, '');

    return encodedString;
}