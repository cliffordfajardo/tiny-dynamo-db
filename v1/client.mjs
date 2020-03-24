import { createInterface } from 'readline';

let inmemory_database = {};

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.on('line', (line) => {
  parser(line);
});



/**
 * @example
 * parser("set name=clifford")
 */
function parser(user_input) {
  const [command, args] = user_input.split(" ");
  if (command === 'set') {
    const [key, value] = args.split("=");
    inmemory_database[key] = value;
    console.log(inmemory_database)
  }

  if (command === 'get') {
    const value = inmemory_database[args];
    if (value === undefined) {
      console.log(`Could not find the value associated with the key ${args}`);
    }
    console.log(value)
  }
}
