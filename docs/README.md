# Baby Dynamo DB
> A distributed key value store database inspired by Amazon's Dynamo DB paper.

## Why is it called Baby Dynamo DB?
This isn't a production grade project; it's more for educational purposes and helping readers capture the high level ideas of distributed systems.

This implementation in written in pure javascript/typescript with no external dependencies.
Created during for a [distributed systems class at Bradfield School of Computer Science](https://bradfieldcs.com/courses/distributed-systems/)

## Documentation
The `docs` folder contains the different versions of the database as I was creating them

## Format of Repo
Every numbered folder (ex; v1, v2, v3) contains my code as I was incrementally improving the system. The reason it's done like this is for educational purposes. Every folder is fully self-contained


## Features
- Custom binary protocol
- Consistent hash table
- database backups


## TODO
- Lots of stuff isn't implemented. In the future I'd like to get around an implementing the following features which were described in the Dynamo paper:
  - a consensus protocol like the gossip based one in the dynamo paper
  - implement anti-entropy with Merkle trees
  - implement write ahead log format
  - implement logshipping 
  - implement a version using protobufs for my data serialization

## Development
Just `cd` into one of the folders prefixed with a `v` and launch your editor from there.

## References, Credits, Thanks
- [DynamoDB paper from Amazon's Engineering Team](http://s3.amazonaws.com/AllThingsDistributed/sosp/amazon-dynamo-sosp2007.pdf)
- [PynamoDB - David Drysdale's post on his own implementation](https://www.lurklurk.org/pynamo/pynamo.html)
