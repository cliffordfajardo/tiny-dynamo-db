/**
 * Takes in input and simply validates it to make sure its a valid command
 * @param {String} user_input
 * @returns {Boolean}
 * @example
 * parser("db_get name") => true
 */
export function commandValidator(user_input) {
  const valid_commands = ['get', 'set', 'keys']
  const command = user_input.trim().split(" ", 1)[0];

  if(!valid_commands.includes(command)){
    return false;
  }
  return true;
}
