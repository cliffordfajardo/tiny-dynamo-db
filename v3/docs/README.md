# V3

- We're now using Typescript; I love code with types.
- We've replaced JSON as our on disk data format. We've created our own super simple binary protocol.

### Message Format
The following is the message format used to represent an entry in our database for version2.
I've chosen "utf8` as the key and value format as it's the most flexible and space efficient
for the types of keys and values I may get.

```
MESSAGE:

--------------------
TIME_STAMP  (4bytes)    uint32
KEY_SIZE    (8bytes)    uint64
VALUE_SIZE  (8bytes)    uint64
KEY                     ascii 
VALUE                   ascii
--------------------
```

A database is just a collection of message files written in sequential order. In this example below, our database has 40 bytes of user generated data.

```
DATABASE:

--------------------
MESSAGE (n bytes)
MESSAGE (n bytes)
--------------------
```
