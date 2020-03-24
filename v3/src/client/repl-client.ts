import { createInterface } from 'readline';
import { commandParser } from '../common/command-parser';
import { SERVER_HOSTNAME } from "../common/constants"
import { Socket } from "net";
import assert from "assert";

assert(process.argv.length === 3, 'Usage: ts-node client.js [DESTINATION_PORT]')
const SERVER_PORT = parseInt(process.argv[2]);


const client = new Socket();
client
.connect({
  port: SERVER_PORT,
  host: SERVER_HOSTNAME,
})
.on("connect", () => {
  console.log(`[CLIENT] - connected to ${SERVER_HOSTNAME}:${SERVER_PORT}`);
})
.on('data', (chunk) => {
  const data = chunk.toString();
  console.log(data);
})
.on("close",() => {
  process.exit();
})

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>'
});

rl.on('line', (line) => {
  const command = commandParser(line);
  if(command){
    client.write(JSON.stringify(command));
  }
});



