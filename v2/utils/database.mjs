import { existsSync, readFileSync, writeFileSync } from 'fs';
import { DATABASE_FILE } from "./constants.js";


/**
 * Our key value database.
 * It reads/writes data into an in memory hash table and then persists it to disk to a JSON file.
 */
export class Database {

  /**
   * Gets the database or creates an empty one.
   * @param {String} file_path - path to database file.
   */
  constructor(file_path){
    const file_exists = existsSync(DATABASE_FILE);
    if(file_exists) {
      this.data = JSON.parse(readFileSync(file_path));
    } else {
      writeFileSync(file_path, "{}");
    }
  }

  /**
   * Gets a value from our key value database.
   * @param {String} key
   * @returns {String | Number | Boolean | Array | Object}
   */
  get(key) {
    // console.log(this.data[key]);
    return this.data[key];
  }

  /**
   * Sets a value in memory first, then save it it back to our JSON file.
   * @param {String} key
   * @param {any} value
   * @returns {void}
   */
  set(key, value) {
    this.data[key] = value;
    writeFileSync(DATABASE_FILE, JSON.stringify(this.data, null, 2));
  }


  view_data(){
    console.log(JSON.stringify(this.data, null, 2));
  }
}
