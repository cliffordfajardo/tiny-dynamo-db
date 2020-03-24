import { SERVER_HOSTNAME, SERVER_PORT, DATABASE_FILE_PATH } from "../common/constants.js"
import { createServer } from "net";
import { commandExecutor } from "../common/command-executor.js";


const backend = createServer();
backend.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
  console.log(`[SERVER] - Listening on ${SERVER_HOSTNAME}:${SERVER_PORT}\n`)
});



/**
 * When a client requests a connection with the server, the server creates a new `socket` dedicated to that client.
 * This socket is bidirectional, meaning we can write to it and we can listen for data back from it.
 */
backend.on('connection', (socket) => {
  socket.write('Connected.');


  socket.on('data', (chunk) => {
    // console.log(`[SERVER]: Recieved message from client: ${chunk.toString()}`);
    const command = JSON.parse(chunk.toString());
    const result = commandExecutor(command);
    if(result) {
      socket.write(result);
    }
  });

  socket.on('error', ()=> console.log('[SERVER] - Some Error occured'));
  socket.on('close', () => {/*console.log(`[SERVER]: Closing connection.`);*/})
})
