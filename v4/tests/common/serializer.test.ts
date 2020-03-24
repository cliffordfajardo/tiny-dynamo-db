import { serialize_message } from '../../src/common/serializer'

import { deserialize_message } from "../../src/common/deserializer";

describe('serialize_message', () => {
  it('serializes a message', () => {
    const message = {
      timestamp: 1000,
      key: 'key1',
      value: 'val1'
    };
    const serialized_message = serialize_message(message);
    const result = deserialize_message(serialized_message);
    expect(message).toEqual(result);
  });
});
