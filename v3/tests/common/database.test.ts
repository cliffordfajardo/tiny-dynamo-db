import { Database } from "../../src/common/database";
import { join } from 'path';
import { existsSync } from "fs";

export const CUSTOM_DATABASE_FILE_PATH = join(__dirname, 'test-database.db');

describe('Database', () => {

  describe('METHOD - constructor', () => {
    it('should use provided file path if provided one', () => {
      const db = new Database({file_path: CUSTOM_DATABASE_FILE_PATH});

      expect(db.database_file_path === CUSTOM_DATABASE_FILE_PATH);
    });
  });

  describe('METHOD - get', () => {
    it('should get a the value for a provided key', () => {
      const db = new Database({file_path: CUSTOM_DATABASE_FILE_PATH});
      db.clear_database();
      db.set('key1', 'val1')
      const result = db.get('key1');


      expect('val1').toEqual(result)
      db.clear_database();
    });
    it('should return undefined when there is no key', () => {
      const db = new Database({file_path: CUSTOM_DATABASE_FILE_PATH});
      db.clear_database();
      const result = db.get('random_key');


      expect(result).toEqual(undefined)
      db.clear_database();
    });
  });

  describe('METHOD - set', () => {
    it('should set a value and return it back', () => {
      const db = new Database({file_path: CUSTOM_DATABASE_FILE_PATH});
      const result = db.set('some_key', 'some_value');


      expect('some_value').toEqual(result);
      db.clear_database();
    });
    // TODO: more exhaustive tests for failures
  });

  describe('METHOD - clear_database', () => {
    it('it should clear the contents of our database', () => {
      const db = new Database({file_path: CUSTOM_DATABASE_FILE_PATH});
      db.set('my_key', 'my_val');
      db.clear_database();
      const result = db.get('my_key');


      expect(result).toEqual(undefined);
      db.clear_database();
    });
  });

  describe('METHOD - backup_database', () => {
    it('it should create a copy of the database', () => {
      const db = new Database({file_path: CUSTOM_DATABASE_FILE_PATH});
      db.backup_database()
      const result = existsSync(`${CUSTOM_DATABASE_FILE_PATH}`);


      expect(result).toBe(true);
      db.clear_database();
    });
  });

  describe('METHOD - get_all_data', () => {
    it('it should return back all the key and values in our database', () => {
      const db = new Database({file_path: CUSTOM_DATABASE_FILE_PATH});
      db.set('key1', 'val1');
      db.set('key2', 'val2');
      const all_data = db.load_database();
      const expected_result = { 'key1': 'val1', 'key2': 'val2' };


      expect(all_data).toEqual(expected_result);
      db.clear_database();
    });
  });

});
