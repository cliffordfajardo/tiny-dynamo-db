# V2 2: JavaScript Implementation of Key Value Store


In V1 we implemented a very simple key value database that only saves data in memory.
In V2, we're going to persist our data to disk, so if our system ever needs to reboot we have our data still.

### Storage File Format
For simplicity sake, we will be storing our data to a `JSON` file. **Though there are more efficient on-disk data formats when it comes to designing a database's on disk file format,** at this stage of our small project, we will stick to JSON for a few reasons:
- a few 100s or low 1000's of key values wouldn't make our file size that big
- loading the JSON file entirely into memory won't be problematic at this scale either.
- JSON is a good format for our use case of implementing a key-value store and the fact that all popular language's have JSON parsing and encoding features built in.

In future examples, we'll see this is one of the downsides of using JSON as a file format. Here are some:
- needing to load the entire file into memory to make use of it.
- needing to write the entire JSON object back to the file on every set.

Later we'll revisit and re-evaluate our data format.



### Modifications since last Example
Continuing from where we left off, our API to set and get values still remains the same, however I have
modified the code to allow for saving our "set" operations to disk.

1. When setting a value:
```sh
$ node db.mjs 
> db_set name ana
> db_set name bob
```

It creates a new file called `database.json` with the relevant key value pairs. Given the example above,
our databse.json file should look like this:

```
{
  1: {name: "anna"}
  2: {name: "bob"}
}
```

2. When getting a value, it should fetch it directly from the JSON file 

Scenario 1: Starting our database and getting a value.
```sh
$ node db.mjs 
> db_get ana
{"name": "anna"}
> db_get bob
db_set 2 '{"name": "bob"}'
```

Scenario 2: Starting our database, setting values and retrieving them should be from memory.
```sh
$ node db.mjs 
> db_set 1 '{"name": "anna"}'
> db_set 2 '{"name": "bob"}'
> db_get 2 '{"name": "bob"}
db_set 2 '{"name": "bob"}'
```

