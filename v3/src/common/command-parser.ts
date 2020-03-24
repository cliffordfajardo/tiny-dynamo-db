import { ACTION_TYPES } from "./constants"
export interface Command {
  name: string;
  args: string[];
}

/**
 * Takes in input and simply validates it to make sure its correct
 * @example
 * commandParser("keys")          => {name: 'keys', args:[]}
 * commandParser("get name")      => {name: 'get',  args:['name']}
 * commandParser("set name ana)   => {name: 'set',  args:['name', 'ana']}
 */
export function commandParser(user_input: string): Command {
  const command = user_input.trim().split(" ", 1)[0];

  switch(command) {
    case ACTION_TYPES.KEYS: {
      return {name: command, args:[]}
    }
    case ACTION_TYPES.CLEAR_DATABASE: {
      return {name: command, args:[]}
    }
    case ACTION_TYPES.GET: {
      const arg = user_input.split(" ").filter(x => x !== "get" && x !== "")[0];
      if(!arg) {
        console.log('Invalid "get" command. Please provide a key for the "get" command.')
      }
      return {name: command, args: [arg] }
    }
    case ACTION_TYPES.SET: {
      const [key, value] = user_input.split(" ").filter(x => x !== "set" && x !== "");
      if(!key || !value) {
        console.log(`Invalid "set" command. Recieved key:${key} \t value:${value}`);
      }
      return {name: command, args: [key, value] }
    }
    default: {
      return {name: command, args:[]};
    }
  }
}

