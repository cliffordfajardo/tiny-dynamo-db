import { createInterface } from 'readline';
import { parser } from './utils/parser.js'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});



rl.on('line', (line) => {
  parser(line);
});
