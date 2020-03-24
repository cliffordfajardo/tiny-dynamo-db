import { existsSync, readFileSync, writeFileSync } from 'fs';
import { DATABASE_FILE_PATH } from "./constants.js";

/**
 * Our key value database.
 * It reads/writes data into an in memory hash table and then persists it to disk to a JSON file.
 */
class Database {
  /**
   * Gets the database or creates an empty one.
   * @param {String} file_path - path to database file.
   */
  constructor(file_path){
    this.file_path = file_path;
    this.load_database();
  }

  /**
   * Gets a value from our key value database.
   * @param {String} key
   * @returns {String}
   */
  get(key) {
    this.load_database();
    return this.data[key];
  }

  /**
   * Sets a value in memory first, then save it it back to our JSON file.
   * @param {String} key
   * @param {any} value
   * @returns {String}
   */
  set(key, value) {
    this.data[key] = value;
    writeFileSync(this.file_path, JSON.stringify(this.data));
    return "OK";
  }


  /**
   * Fetches the latest JSON file from disk. If there is no file it creates an empty JSON file.
   * @returns {void}
   */
  load_database(){
    const file_exists = existsSync(this.file_path);
    if(file_exists) {
      try {
        this.data = JSON.parse(readFileSync(this.file_path));
      } catch(error) {
        console.error(`Error occurred attempting to open JSON file. You may have an invalid JSON file or a syntax error.`)
      }
    }
    else {
      writeFileSync(this.file_path, "{}");
      this.data = {};
    }
  }

  /**
   * Load the entire JSON file database and print it out to console.
   * @returns {Object}
   */
  view_data(){
    this.load_database();
    const data = JSON.stringify(this.data, null, 2)
    return data;
  }
}


export const database = new Database(DATABASE_FILE_PATH);
