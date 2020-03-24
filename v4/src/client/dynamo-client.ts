import { Socket } from "net";
import { commandParser } from "../common/command-parser";

interface IDynamoOptions  {
  destination_port: number;
  destination_hostname: string;
}

export class DynamoClient {
  public socket!: Socket;
  public destination_port: number;
  public destination_hostname: string;

  constructor(options: IDynamoOptions){
    this.destination_port = options.destination_port;
    this.destination_hostname = options.destination_hostname;
    this.socket = this.initalize_connection();
  }

  async get(key:string): Promise<any> {
    const command = commandParser(`get ${key}`);
    this.socket.write(JSON.stringify(command));

    return new Promise((resolve) => {
      this.socket.on('data', (buffer:Buffer) => {
        const data = buffer.toString();
        resolve(data);
      })
    })
  }

  async put(key:string, value:string): Promise<any>{
    const command = commandParser(`set ${key} ${value}`);
    this.socket.write(JSON.stringify(command));

    return new Promise((resolve) => {
      this.socket.on('data', (buffer:Buffer) => {
        const data = buffer.toString();
        resolve(data);
      })
    })
  }

  initalize_connection(): Socket {
    const socket = new Socket();
    socket.connect({ port: this.destination_port, host: this.destination_hostname });
    socket.on("connect", () => console.log(`[CLIENT] - connected to Dynamo Node at ${this.destination_hostname}:${this.destination_port}`));
    socket.on("close", () => process.exit());
    return socket;
  }

  close(){
    this.socket.destroy();
  }
}
