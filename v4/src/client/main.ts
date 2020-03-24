import {DynamoCLIClient} from "./cli-client";
import assert from "assert";
assert(process.argv.length === 3, 'Usage: ts-node client.js [DESTINATION_PORT]')


assert(process.argv.length === 3, 'Usage: ts-node client.js [DESTINATION_PORT]')
const SERVER_PORT = parseInt(process.argv[2]);

new DynamoCLIClient({
  destination_hostname: 'localhost',
  destination_port: SERVER_PORT
})
