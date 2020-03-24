import { createServer, Server, Socket } from "net";
import { DATABASE_FOLDER_PATH } from '../common/constants';
import { ICommand } from "../common/command-parser"
import { commandExecutor} from "../common/command-executor";
import { Database } from "../common/database";

export interface DynamoOptions {
  hostname: string;
  port: number;
}

export class DynamoNode {
  public port: number;
  public hostname: string;
  public server!: Server;
  public data_store:Database;
  public socket_pool:Socket[] = [];

  DynamoNode(options: DynamoOptions){
    this.port = options.port;
    this.hostname = options.hostname;
    this.data_store = new Database({file_path: `${DATABASE_FOLDER_PATH}database@${this.hostname}:${this.port}.db`});
    this.server = this.initialize_server();
  }

  initialize_server(): Server{
    const server = createServer();
    server.listen(this.port, this.hostname, () => { console.log(`[SERVER] - Listening on ${this.hostname}:${this.port}\n`)});

    server.on('connection', (socket) => {
      console.log(`[SERVER] New connection from ${socket.localAddress}:${socket.localPort}`)
      this.socket_pool.push(socket);

      socket.on('data', (buffer) => {
        this.handle_client_command(socket, buffer);
      });

      socket.on('error', () => console.log('[SERVER] - Some Error occured'));
      socket.on('end', () => this.handle_socket_end_or_close(socket));
      socket.on('close', () => this.handle_socket_end_or_close(socket));
    })
    return server;
  }

  handle_client_command(socket:Socket, data:Buffer){
    const command:ICommand = JSON.parse(data.toString());
    const result = commandExecutor(command, this.data_store);
    if(result) {
      socket.write(JSON.stringify(result));
    }
  }

  handle_socket_end_or_close(socket:Socket){
    const target_index = this.socket_pool.findIndex((s) => s === socket);
    this.socket_pool.splice(target_index, target_index+1);
    console.log(`\n A socket was removed from the pool.\nTotal # of connected sockets: ${this.socket_pool.length}\n`)
  }

  async close(){
    return new Promise((resolve, _reject) => {
      this.server.close(() => {
        console.log(`Shuting down Dynamo node at ${this.hostname}:${this.port}`)
        resolve();
      })
    });
  }
}
