import { ConsistentHashtable } from "../../src/common/consistent-hash-table/consistent-hash-table";

describe("ConsistentHashtable", () => {
  describe('METHOD - add', () => {
    it('should add nodes to our list', () => {
        const c_hashtable = new ConsistentHashtable();
        c_hashtable.add('nodeA');
        c_hashtable.add('nodeB');
        c_hashtable.add('nodeC');

        const actual_value = c_hashtable.sorted_node_list;
        const expected_value = [
          {"48a11a3651efc3fed85e8943eb24960d": "nodeB"},
          {"6333cd37f5ca229fe2d0b9759d73616f": "nodeC"},
          {"fa3d10258f6564c08b31ffc1cb25d9ce": "nodeA"}
        ]
        expect(actual_value).toEqual(expected_value);
      });

    it('should add a node "weight" number of times', () => {
        const c_hashtable = new ConsistentHashtable();
        c_hashtable.add('nodeA');
        c_hashtable.add('nodeB', 2);
        c_hashtable.add('nodeC', 3);

        const actual_value = c_hashtable.sorted_node_list;
        const expected_value = [
          {'03605efc5433045b345e2c64a7d42039': "nodeC"},
          {'48a11a3651efc3fed85e8943eb24960d': "nodeB"},
          {'62b19cbd57f3e2e7588ae44acf003a9f': "nodeC"},
          {'6333cd37f5ca229fe2d0b9759d73616f': "nodeC"},
          {'72123f3dedc2a3fadf81989e4c5ce22c': "nodeB"},
          {'fa3d10258f6564c08b31ffc1cb25d9ce': "nodeA"}
        ];
        expect(actual_value).toEqual(expected_value);
      });
  })

  describe('METHOD - get', () => {
    it('should return a list of `count` nodes that are consequtively after the hash of the given key', () => {
        const c_hashtable = new ConsistentHashtable();
        c_hashtable.add('nodeA');
        c_hashtable.add('nodeB');
        c_hashtable.add('nodeC');

        const actual_value0 = c_hashtable.sorted_node_list;
        const expected_value0 = [
          {"48a11a3651efc3fed85e8943eb24960d": "nodeB"},
          {"6333cd37f5ca229fe2d0b9759d73616f": "nodeC"},
          {"fa3d10258f6564c08b31ffc1cb25d9ce": "nodeA"}
        ]
        expect(actual_value0).toEqual(expected_value0);


        // Test cases for count = 1
        const actual_value1 = c_hashtable.get('nodeA');
        const expected_value1 = ['nodeB'];
        expect(actual_value1.results).toEqual(expected_value1);

        const actual_value2 = c_hashtable.get('nodeB');
        const expected_value2 = ['nodeC'];
        expect(actual_value2.results).toEqual(expected_value2);

        const actual_value3 = c_hashtable.get('nodeC');
        const expected_value3 = ['nodeA'];
        expect(actual_value3.results).toEqual(expected_value3);



        // count = 2 cases
        const actual_value4 = c_hashtable.get('nodeA', 2);
        const expected_value4 = ['nodeB', 'nodeC'];
        expect(actual_value4.results).toEqual(expected_value4);

        const actual_value5 = c_hashtable.get('nodeB', 2);
        const expected_value5 = ['nodeC', 'nodeA'];
        expect(actual_value5.results).toEqual(expected_value5);

        const actual_value6 = c_hashtable.get('nodeC', 2);
        const expected_value6 = ['nodeA', 'nodeB'];
        expect(actual_value6.results).toEqual(expected_value6);

      });

    it('should return a list of `count` nodes that are consequtively after the hash of the given key', () => {
        const c_hashtable = new ConsistentHashtable();
        c_hashtable.add('nodeA');
        c_hashtable.add('nodeB');
        c_hashtable.add('nodeC');

        const actual_value0 = c_hashtable.sorted_node_list;
        const expected_value0 = [
          {"48a11a3651efc3fed85e8943eb24960d": "nodeB"},
          {"6333cd37f5ca229fe2d0b9759d73616f": "nodeC"},
          {"fa3d10258f6564c08b31ffc1cb25d9ce": "nodeA"}
        ]
        expect(actual_value0).toEqual(expected_value0);

        //Skip 1
        const actual_value1 = c_hashtable.get('nodeA', 1,['nodeB']);
        const expected_value1 = ['nodeC'];
        expect(actual_value1.results).toEqual(expected_value1);

        const actual_value2 = c_hashtable.get('nodeB', 1,['nodeC']);
        const expected_value2 = ['nodeA'];
        expect(actual_value2.results).toEqual(expected_value2);

        const actual_value3 = c_hashtable.get('nodeC', 1,['nodeA']);
        const expected_value3 = ['nodeB'];
        expect(actual_value3.results).toEqual(expected_value3);

        //Skip 2
        const actual_value6 = c_hashtable.get('nodeA', 1,['nodeB', 'nodeC']);
        const expected_value6 = ['nodeA'];
        expect(actual_value6.results).toEqual(expected_value6);
        const actual_value4 = c_hashtable.get('nodeC', 1,['nodeA', 'nodeB']);
        const expected_value4 = ['nodeC'];
        expect(actual_value4.results).toEqual(expected_value4);

        const actual_value5 = c_hashtable.get('nodeB', 1,['nodeA', 'nodeC']);
        const expected_value5 = ['nodeB'];
        expect(actual_value5.results).toEqual(expected_value5);

        //Skip 3
        const actual_value7 = c_hashtable.get('nodeA', 1,['nodeA', 'nodeB', 'nodeC']);
        const expected_value7:[] = [];
        expect(actual_value7.results).toEqual(expected_value7);

        const actual_value8 = c_hashtable.get('nodeC', 1,['nodeA', 'nodeB', 'nodeC']);
        const expected_value8:[] = [];
        expect(actual_value8.results).toEqual(expected_value8);

        const actual_value9 = c_hashtable.get('nodeB', 1,['nodeA', 'nodeB', 'nodeC']);
        const expected_value9:[] = [];
        expect(actual_value9.results).toEqual(expected_value9);

      });
    });

  });
