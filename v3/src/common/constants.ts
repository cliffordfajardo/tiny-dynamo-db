import { join } from 'path';

// Common
export const PROJECT_ROOT = join(__dirname, '../..');
export let DATABASE_FOLDER_PATH = `${PROJECT_ROOT}/database/`;

// TODO: configure dev (testing) vs production like config
// if(process.env.NODE_ENV === "development") {
//   DATABASE_FOLDER_PATH = `${PROJECT_ROOT}/tests/database-v2`;
//   DEFAULT_DATABASE_FILE_PATH = `${DATABASE_FOLDER_PATH}/test-db`
// }

// Client Constants
export const MSG_ACTION_GET = 'get'
export const MSG_ACTION_SET = 'set'
export const MSG_ACTION_KEYS = 'keys'


// Database File Format Constants
export const DB_RECORD_KEY_SIZE = 4;
export const DB_RECORD_VALUE_SIZE = 4;
export const DB_RECORD_TIMESTAMP_SIZE = 4
export const DB_RECORD_SIZE = DB_RECORD_KEY_SIZE + DB_RECORD_VALUE_SIZE + DB_RECORD_TIMESTAMP_SIZE;


// Server Constants
export const SERVER_RES_STATUS_OK = "OK";
export const SERVER_PORT = 5555;
export const SERVER_HOSTNAME = 'localhost';


export enum ACTION_TYPES {
  GET            = "get",
  SET            = "set",
  KEYS           = 'keys',
  CLEAR_DATABASE = "clear_database"
}
