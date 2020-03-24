import {
  DB_RECORD_TIMESTAMP_SIZE
} from "./constants"


interface Message {
  timestamp: number,
  key: string,
  value: string
}

// Serialize a JS object (Message)
export const serialize_message = (message: Message) => {
  const key_length    = message.key.length;
  const value_length  = message.value.length;
  const buffer_size   = key_length + value_length + DB_RECORD_TIMESTAMP_SIZE;

  const buf = Buffer.alloc(buffer_size);

  buf.writeUInt32BE(message.timestamp, 0);
  buf.write(message.key,   4, key_length,   'ascii');
  buf.write(message.value, 8, value_length, 'ascii');
  return buf;
}
