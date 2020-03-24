import { existsSync, readFileSync, appendFileSync, openSync, closeSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { DATABASE_FOLDER_PATH } from "./constants";
import { serialize_message } from './serializer';
import { deserialize_all_messages, DeserializedMessage } from './deserializer';;

export interface IInMemoryDatabase { [key: string]: string;}
export interface IDatabaseOptions { file_path: string; }

export class Database {
  in_memory_database: IInMemoryDatabase = {};
  database_file_path: string;

  constructor(options: IDatabaseOptions) {
    const {file_path} = options;
    this.database_file_path = file_path;
    this.create_or_load_database();
  }

  /*---------------- DB ACTIONS-----------------**/
  get(key: string):string | void {
    return this.in_memory_database[key];
  }

  set(key:string, value:string):string {
    const message = {
      timestamp: Math.floor(Date.now() / 1000),
      key,
      value,
    };
    const record:Buffer = serialize_message(message);
    appendFileSync(this.database_file_path, record);

    this.in_memory_database[key] = value;
    return this.in_memory_database[key];
  }

  clear_database():void {
    this.in_memory_database = {};
    writeFileSync(this.database_file_path, '');
  }

  keys(){
    return this.in_memory_database;
  }



  create_or_load_database():void {
    const file_exists = existsSync(this.database_file_path);
    if(file_exists) {
      try {
        this.load_database();
      } catch {
        console.error(`Error attempting to open database file at location: ${this.database_file_path}.`);
      }
    }
    else {
      console.error(`Database doesnt exist at the following location: ${this.database_file_path}.`);
      console.error(`Creating new empty database at location: ${this.database_file_path}.`);
      try { mkdirSync(DATABASE_FOLDER_PATH); } catch {}
      try { closeSync(openSync(this.database_file_path, 'w')); } catch {} // create an empty file
    }
  }

  load_database():IInMemoryDatabase {
    const database_file_buffer = readFileSync(this.database_file_path);
    deserialize_all_messages(database_file_buffer)
      .forEach((record: DeserializedMessage) => {
        if(record.key.length) {
          this.in_memory_database[record.key] = record.value;
        }
    })
    return this.in_memory_database;
  }

  backup_database(){
    copyFileSync(this.database_file_path, `${this.database_file_path}`);
  }
}

