import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const PROJECT_ROOT = join(__dirname, '..');
export const DATABASE_FILE_PATH = `${PROJECT_ROOT}/database.json`;
export const SERVER_PORT = 5555;
export const SERVER_HOSTNAME = 'localhost';





