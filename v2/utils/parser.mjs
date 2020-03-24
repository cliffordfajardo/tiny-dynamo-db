import { Database } from "./database.js";
import { DATABASE_FILE } from "./constants.js";

const db = new Database(DATABASE_FILE);

/**
 * @example parser("set name=clifford")
 */
export function parser(user_input) {
  const [command, args] = user_input.split(" ");
  if (command === 'set') {
    const [key, value] = args.split("=");
    try {
      db.set(key, value);
    } catch(error) {
      console.error(`Invalid JSON value. Please make sure you are quoting your JSON values. \nYou tried to inserError trying to insert the following: key=${key} value=${value}`)
    }
  }
  else if (command === 'get') {
    const key = args;
    const value = db.get(key);
    if (value === undefined) {
      console.log(`Could not find the value associated with the key ${args}`);
    } else {
      return value;
    }
  }
  else if (command === "data") {
    console.log(db.view_data())
  }

  else {
    throw Error(`We only allow "db_get" and "db_set" commands. Please see the API docs. You Attempted to run the command: ${command}`)
  }
}
