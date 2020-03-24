# Misc notes

TODO:
- condense and place these notes in their appropriate folder




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








































































## Recap
Before v4, no partioning occured and every dynamo node had a full replica of the database.

In version 4 we are adding a partioning mechanism to our key value store. 

### What is Partioning?
At a high level partinoning refers to breaking up our data across other systems.

### Why/When do I Partition?
Here are few factors that might motivate us to partition data across multiple nodes, which also help us out with availability:

Storage capicity:
- we might have too much data on a node and our computer can't handle it. Ex: no more disk space

Hardware Bottlenecks:
- throughput of storage, communication or compute


### Request Routing
There are several different approaches we could for implementing how a query will reach it's destination.
We won't be using a service discovery tool like Zookeeper or a context aware load balancer, instead we will
have each server "gossip" to each other the cluster state.


### How is partioning different than Replication?
_"Partitioning is usually combined with replication so that copies of each partition are stored on multiple nodes. This means that, even though each record belongs to exactly one partition, it may still be stored on several different nodes for fault tolerance._


### Assumptions
In this version, it is assumed that:

the partition count will not be resized after the cluster is created
new nodes always join and exit the cluster successfully; every existing node correctly learns about the new node, and the new node has a perfect map of the cluster which includes itself.


### Goal
1. Refactor server code and encapsulate it in a class called `DynamoNode`
  - the way our server code is now, is not testable, since it's not contained in a module or function.

2.


We introduce a 

TODO: v3
To version 3, add a new section that does full copy replication (forgot the name of this). Basically simulate a hot standby.




## Related
- DDIA Chapter 6 Partioning
- DDIA Chapter 9 Consistency (talks about Dynamo DB, consensus, sloppy quoroms, use of N, W and R)





