# V1
Lets get a simple key value store working!

# V1 Goal
Create a client that writes to an in memory data store. When the program shuts down, the database is reset.


## API
### `db_set`
```sh
# Example
# db_set key=value

$ node db.mjs 
> db_set name ana
> db_set name bob
```

### `db_get`
```sh
# Example
# db_get key
$ node db.mjs 
>  db_set name ana
>  db_set name bob
>  db_get ana
'{"name": "ana"}'
>  db_get bob
'{"name": "bob"}'
```

## Performance
### `db_set`
Since we are storing keys inside an object in memory, the sets are nearly instant.


### `db_get`
Since we are storing keys inside an object in memory, the sets are nearly instant.

### Continuing....
See the folder `example2` to continue


