import { Database, IInMemoryDatabase } from "./database";
import { Command } from "./command-parser";
import { ACTION_TYPES } from "./constants"

/**
 * @example
 * commandExecutor({name: 'get',  args:['name']}) => "some_name"
 * commandExecutor({name: 'set',  args:['name', 'ana]}) => "OK"
 */
export function commandExecutor(command: Command, database:Database):IInMemoryDatabase | string {
  switch(command.name) {

    case ACTION_TYPES.KEYS: {
      const result = database.load_database();
      return result;
    }

    case ACTION_TYPES.CLEAR_DATABASE: {
      database.clear_database();
      return {};
    }

    case ACTION_TYPES.GET: {
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

    case ACTION_TYPES.SET: {
      const [key, value] = command.args;
      try {
        const result = database.set(key, value);
        return result;
      }
      catch {
        return `SET_DATABASE_ERROR`
      }
    }
    default:{
      return {}
    }
  }
}

