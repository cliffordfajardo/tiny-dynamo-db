# Consistent Hash Table

# API
Below is a brief overview of the API. The test file for our module `consistent-hash-table.test.ts` can you give a much better understanding of how this works after reading this.

##  add
Adds a key around the hash ring. In Amazon's Dynamo DB paper, this is called the _preferences list_.
- key: any string
- weight: the number of times to add the node in the ring. By default the value is 1.

Adding 1 node to our ring.

```ts
const c_hashtable = new ConsistentHashtable();
c_hashtable.add('nodeA');
```

If we wanted a node to appear multiple times in the ring, we can change the `weight`.

```ts
const c_hashtable = new ConsistentHashtable();
c_hashtable.add('nodeA', 2);
```

Currently we don't support adding multiple nodes in the ring by passing the same key to add multiple times. In other words, you define the replication up front so this wouldn't work, currently:

```ts
const c_hashtable = new ConsistentHashtable();
c_hashtable.add('nodeA');
```


## get
Returns the first node in the hash after the key.
- key: string
- count: number 
  - If a count is specified, it returns an array of count distinct nodes; first the one that handles the named resource, then the following closest nodes around the hash ring
- avoid_list: list of keys 
  - (recall a key represents a node or resource)
  - nodes we will skip in the ring if we encounter it.
  - in Dynamo DB paper, sometimes nodes in our ring may be down, so we want to skip them.
