import { commandValidator } from "./command-validator.js"

/**
 * Takes in input and simply validates it to make sure its correct
 * @param {String} user_input
 * @returns {Object | void}
 * @example
 * commandParser("keys")          => {name: 'keys', args:[]}
 * commandParser("get name")      => {name: 'get',  args:['name']}
 * commandParser("set name 'ana") => {name: 'set',  args:['name', 'ana']}
 */
export function commandParser(user_input) {
  const isValidCommand = commandValidator(user_input);
  if(!isValidCommand) return;

  const command = user_input.trim().split(" ", 1)[0];

  if(command === 'keys') {
    return {name: 'keys', args:[]}
  }

  else if(command === 'get') {
    const arg = user_input.split(" ")
      .filter(x => x !== "get" && x !== "")[0];
    if(!arg) {
      console.log('Invalid "get" command. Please provide a key for the "get" command.')
    }
    return {name: 'get', args: [arg] }
  }

  else if(command === 'set') {
    const [key, value] = user_input.split(" ")
      .filter(x => x !== "set" && x !== "");

    if(!key || !value) {
      console.log(`Invalid "set" command. Recieved key:${key} \t value:${value}`);
    }
    return {name: 'set', args: [key, value] }
  }
}
