import fs from 'fs/promises';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = dotenv.config().parsed;

if (!env) {
    throw new Error('.env file is missing or invalid');
}

const targetPath = path.resolve(__dirname, '../src/environments/environment.ts');

const envFileContent = `export const environment = {
  production: true,
  apiKey: '${env.API_KEY}',
  apiUrl: '${env.API_URL}'
};
`;

await fs.writeFile(targetPath, envFileContent);