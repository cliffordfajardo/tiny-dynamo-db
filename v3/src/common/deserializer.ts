import {
  DB_RECORD_SIZE
} from "./constants"

/**`
 * Javascript encodes strings literals in UTF16, but Node buffers are utf8 by default.
 * Since I want to store strings in utf8 for more compactness in my binary protocol (see serializer.ts),
 * I'll just convert back to utf16 once I've decerialized since everything in JS land is utf16 anyways.
 *
 * Mac is big endian so our source code is big endian since Node.js currently doesn't have a 'utf16be' encoding
 * SEE:
 * https://kevin.burke.dev/kevin/node-js-string-encoding/
 * https://simplicable.com/new/utf-8-vs-utf-16
 * https://github.com/nodejs/node/issues/12813
 * @example
 * var a = 1; //utf16
 * {
 *   my_key: 'my_val' //key and value are utf16
 * }
 * // any string in JS land is utf16
 */
const unpack = (buf: Buffer) => {
  return buf.toString('ascii')
}


export interface DeserializedMessage {
  timestamp: number,
  key: string,
  value: string
}

export function deserialize_message(buf: Buffer): DeserializedMessage {
  const timestamp  = buf.readUInt32BE(0);
  const key = unpack(buf.slice(4,8));
  const value = unpack(buf.slice(8,12));

  return {
    timestamp,
    key,
    value
  }
}


export function deserialize_all_messages(buf: Buffer): DeserializedMessage[] {
  const results: DeserializedMessage[] = [];
  for(let i=0; i < buf.length; i+= DB_RECORD_SIZE) {
    const message = deserialize_message(buf.slice(i, i + DB_RECORD_SIZE));
    results.push(message)
  }
  return results;
}

