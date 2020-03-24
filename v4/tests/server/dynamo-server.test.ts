import { DynamoNode } from "../../src/server/dynamo-server";
import {timeout} from "../utils";

describe('DynamoNode', () => {
  describe('METHOD - constructor', () => {
    it('it should start a server at the specified host and port', async () => {
        const dynamo_node = new DynamoNode({ hostname: 'localhost', port:9001 });
        expect(dynamo_node.port).toBe(9001);
        expect(dynamo_node.hostname).toBe('localhost');
        expect(dynamo_node.server).toBeDefined();
        await timeout(50);
        await dynamo_node.close();
    })
  })
});
