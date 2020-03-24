import {DATABASE_FILE_PATH} from "./constants.js";
import { commandParser } from "./command-parser.js"
import {  database } from "./database.js";

/**
 * @param {string} user_input
 * @returns {String}
 * @example
 * commandExecutor({name: 'get',  args:['name']}) => "some_name"
 * commandExecutor({name: 'set',  args:['name', 'ana]}) => "OK"
 */
export function commandExecutor(command) {
  if(command.name === 'keys') {
    const result = database.view_data();
    return result;
  }


  else if(command.name === 'get'){
    const key = command.args[0];
    let result;
    try {
      result = database.get(key);
      if(result) {
        return result;
      } else {
        return "NOT_FOUND";
      }
    } catch {
      return `GET_DATABASE_ERROR`
    }
  }

  else if(command.name === 'set') {
    const [key, value] = command.args;
    try {
      const result = database.set(key, value);
      return result;
    }
    catch {
      return `SET_DATABASE_ERROR`
    }
  }
  else {
    return;
  }
}
