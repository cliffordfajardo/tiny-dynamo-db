import { SERVER_HOSTNAME } from "../common/constants"
import { createServer } from "net";
import { DATABASE_FOLDER_PATH } from '../common/constants';
import { commandExecutor } from "../common/command-executor";
import { Database } from "../common/database";
import assert from 'assert';

assert(process.argv.length === 3, 'Usage: ts-node server.js [PORT]')
const SERVER_PORT = parseInt(process.argv[2]);

const backend = createServer();
backend.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
  console.log(`[SERVER] - Listening on ${SERVER_HOSTNAME}:${SERVER_PORT}\n`)
});

const database = new Database({
  file_path: `${DATABASE_FOLDER_PATH}database@${SERVER_HOSTNAME}:${SERVER_PORT}.db`
});

/**
 * When a client requests a connection with the server, the server creates a new `socket` dedicated to that client.
 * This socket is bidirectional, meaning we can write to it and we can listen for data back from it.
 */
backend.on('connection', (socket) => {
  socket.write('Connected.');

  socket.on('data', (chunk) => {
    console.log('data??')
    // console.log(`[SERVER]: Recieved message from client: ${chunk.toString()}`);
    const command = JSON.parse(chunk.toString());
    const result = commandExecutor(command, database);
    if(result) {
      socket.write(JSON.stringify(result));
    }
  });

  socket.on('error', () => console.log('[SERVER] - Some Error occured'));
  socket.on('close', () => {/*console.log(`[SERVER]: Closing connection.`);*/})
})
