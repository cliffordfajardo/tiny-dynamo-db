import { deserialize_message } from "../../src/common/deserializer";
import { serialize_message } from '../../src/common/serializer'

describe('deserialize_message', () => {
  it('deserializes a message back to its original javascript object', () => {
    const message = {
      timestamp: 1000,
      key: 'key1',
      value: 'val1'
    };

    const serialized_message = serialize_message(message);
    const result = deserialize_message(serialized_message);
    expect(result).toEqual(message);
  });
});

