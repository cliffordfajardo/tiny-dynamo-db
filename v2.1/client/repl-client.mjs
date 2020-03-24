import { createInterface } from 'readline';
import { commandParser } from '../common/command-parser.js';
import {SERVER_HOSTNAME, SERVER_PORT} from "../common/constants.js"
import { Socket } from "net";

const client = new Socket();

client
.connect({
  port: SERVER_PORT,
  host: SERVER_HOSTNAME,
})
.on("connect", () => {
  console.log(`[CLIENT] - connected to ${SERVER_HOSTNAME}:${SERVER_PORT}`);
})
.on('data', (chunk)=> {
  const data = chunk.toString();
  console.log(data);
})
.on("close", (had_error) => {
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



