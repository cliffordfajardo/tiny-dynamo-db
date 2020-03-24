# V2.1

## Whats changed since v2
- I've split out the code; now we have client and server folder.
- I've introduced a server that listens over a socket to handle talking to the database. Previously we we're doing everything in one process.
- adding replication to our database.

## Back Up The Darn Data
Currently this is where we are:
- We currently have 1 node. If our only node fails we will face downtime.
- We currently have 1 copy of our database. If our only database copy gets corrupted for any reason, we lose all our customer's data, thereby our business is screwd!

Goal: 
Implement a way to back up our the existing database data. By doing so we at least achieve the most basic fault taulerance by having a database backup.

Steps:
1. Add a `backup_data` method
    - This method will simply copy the existing database file. 
    - The new copy file will also have a suffix ending with a dash and the name of the backup. For example: `${DBFILE}-SOME_NAME`

Considerations:
For now, assume that the backup will only be used if an administrator decides to manually switch to it. This doesn’t mean that you should entirely ignore replication lag, just that it’s an issue that will only arise when the primary fails.



## Support Multiple Nodes in our system
Currently this is where are are:
We currently have 1 node, however, we want to be able to spawn multiple. The way we'll implement supporting multiple nodes is via  "manual configuration". What do we mean by "manual configuration"? As opposed to having code that will automatically replicate our server, we will require an operator (a user) to manually set up replication; trying to keep things simple. In the future we can add automatic replication of nodes in our code.

Goal:
- Implement the ability to spawn multiple instances of clients and servers via manual configuration like in the examples below:

Steps:
1. Allowing user to pass a port number to `server.ts`
  - This will allow us to spawn a server on a specified port. For example: `node server.ts --port 5000`
2. Allowing user to pass a port number to `repl-client.ts`
  - This will allow us to spawn a client, which will connect to specific server port specified by the user. For example: `node repl-client.ts --port 5000`

This is an example of spawning multiple servers and clients:
```sh
# bash
node server.ts --port 5000
node server.ts --port 5001

node repl-client.ts --port 5000
node repl-client.ts --port 5001
```

3. When we spawn a new server, it should have it's own database file.
- The easiest way to achieve this is to have each server have a database file with its ip and port number on it. For example: `database@localhost:5555`. This scheme allows us to easily map our existing server to its associated database file
