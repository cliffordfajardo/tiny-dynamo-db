import { createInterface, Interface } from 'readline';
import { commandParser } from '../common/command-parser';
import { Socket } from "net";


interface IDynamoOptions  {
  destination_port: number;
  destination_hostname: string;
}

export class DynamoCLIClient {
  public socket!: Socket;
  public destination_port: number;
  public destination_hostname: string;
  public cli: Interface;

  constructor(options: IDynamoOptions){
    this.destination_port = options.destination_port;
    this.destination_hostname = options.destination_hostname;
    this.socket = this.initialize_connection();
    this.cli = this.initialize_cli();
  }

  initialize_connection(){
    const socket = new Socket();
    socket.connect({
      port: this.destination_port,
      host: this.destination_hostname,
    })
    .on("connect", () => {
      console.log(`[CLIENT] - connected to Dynamo Node at ${this.destination_hostname}:${this.destination_port}`);
    })
    .on('data', (buffer) => {
      console.log(buffer.toString());
    })
    .on("close", () => {
      process.exit()
    })
    return socket;
  }

  initialize_cli(): Interface {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '>'
    });

    rl.on('line', (line) => {
      const command = commandParser(line);
      if(command){
        this.socket.write(JSON.stringify(command));
      }
    });
    return rl;
  }

  close(){
    this.socket.destroy();
    this.cli.close();
  }
}


