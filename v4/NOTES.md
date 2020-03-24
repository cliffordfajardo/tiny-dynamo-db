# Class 4: Replicating our KV Store
I implemented the most basic version of replication by allowing a node to create a backup of its data via a `backup` method.
But currently I haven't implemented the logic for when a node fails or  Both servers running are using the same database.

The way I envision things:

```
- Server1 has a database called `server1-database`
- When we call backup it creates a backup called `server1-backup-database`. Eventually we need to send a message to `server2` to tell it to read from this new database.
```

I sense that each node would need to know when there are other nodes in the system.
Each node would need the IP address of the other to send it messages.

```
node 1 -------MSG-----> node2 ----> node2 takes the message and does something
```


At this point in time, my senses are telling me that I should revist the following topics later
1. Automatic fail over
  - I could create a mechanism allowing nodes to know about other nodes in my system. Currently, I can spawn multiple nodes, but they don't know about each other, nodes would need to know about each other to implement automatic failover.
  - Each node could keeo a meta data on other nodes.
  - Nodes would constantly ping each other with messages.
    - the simplest communication protocol would be to use JSON. The next option which is more efficient, but time consuming for me to implement is a binary communication protocol.

  ```js
  // Pseudocode for the future...maybe
  class Node {
    peer_nodes = [
      {ip_address: '???', status: '???'},
      {ip_address: '???', status: '???'}
    ]

    async send_message(message){
      peer_node.forEach(node => {
        socket.write(message)
      })
    }
  }
  ```
  
2. Scaling Reads
  - I would need to finish `1.`

I would need to have 
- automatic failover after I: finish PynamoDB
