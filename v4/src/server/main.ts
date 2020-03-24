import { DynamoNode } from "./dynamo-server";
import assert from 'assert';

assert(process.argv.length === 3, 'Usage: ts-node server.js [PORT]');
new DynamoNode({port:parseInt(process.argv[2]), hostname:'localhost'})
