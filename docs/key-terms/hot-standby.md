# Hot Standby
A hotstandby is a copy of your master database that is ready to be used immediately.
The switch over to a standby is either done manually by a person or automatically by software.

Hot standby also typically describes:
- a setup where the primary is only taking write queries, while the standby is only taking reads.

How does the hotstanby get it's data?
Once the master registers its writes, it will send a change update message for the replicat to apply on it's own data.

References
- Chapter 5 DDIA
