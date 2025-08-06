import 'dotenv/config';
import { writeFile } from 'fs/promises';

const env = {
    production: true,
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY
};

const content = `export const environment = ${JSON.stringify(env, null, 2)};\n`;

await writeFile('./src/environments/environment.ts', content);