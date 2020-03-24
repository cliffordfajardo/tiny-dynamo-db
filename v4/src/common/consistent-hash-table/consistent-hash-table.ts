/**
 * Using md5 simply to create a good deterministic hash, as opposed to creating a hashing function
 * from scratch.
 * I would avoid md5 in production evironments. See links below
 * - https://www.reddit.com/r/PHP/comments/vhnav/bcrypt_vs_md5_in_password_hashing/
 * - https://www.youtube.com/watch?v=O6cmuiTBZVs
 */
import { createHash } from "crypto";
import { bisect, deepClone } from "./utils";

export interface IStringMap { [key: string]: string;}
export interface IStringNumberMap { [key: string]: number;}
interface IGetResult {
  avoided: string[];
  results: string[];
}

// TODO: use a map instead and draw out implementation to reduce # of propertieshttps://dev.to/katkelly/advantages-of-a-javascript-map-cen

/**
 * Consistent hashing algorithm described in section 4.2 of the dynamo DB paper
 */
export class ConsistentHashtable {
  node_list: IStringMap[] = [];
  base_node_map:IStringNumberMap = {};
  sorted_node_list: IStringMap[] = []
  sorted_hashes_list: string[] = [];

  constructor() {}

  add(key: string, weight:number = 1) {
    this.base_node_map[key] = weight;

    while(weight !== 0) {
      const hashed_key = createHash('md5').update(key + weight).digest('hex'); // we do key+weight only for the purposes of generating a different hashed key for a node that's going to be repeated along our ring.
      this.node_list.push({ [hashed_key]: key });
      weight--;
    }

    this.sorted_node_list = deepClone(this.node_list)
      .sort((obj1: IStringMap, obj2: IStringMap) => {
        const key1 = Object.keys(obj1)[0];
        const key2 = Object.keys(obj2)[0];
        return key1 > key2 ? 1 : -1;
      });
    this.sorted_hashes_list = this.sorted_node_list.map(n => Object.keys(n)[0]);
  }


  get(key: string, count: number = 1, avoid_list: string[] = []):IGetResult {
    const weight = this.base_node_map[key];
    const hashed_key = createHash('md5').update(key+weight).digest('hex');
    let results: string[] | any[] = [];
    let avoided_list: string[] | any[]= [];

    const initial_index = bisect(this.sorted_hashes_list, hashed_key);
    let next_index = initial_index;

    while (results.length < count) {
      let is_at_end_of_ring = next_index === this.sorted_node_list.length;
      if (is_at_end_of_ring) next_index = 0;

      let node: IStringMap = this.sorted_node_list[next_index];
      let node_name = Object.keys(node)[0]
      let node_value = node[node_name];

      if (avoid_list.includes(node_value)) {
        avoided_list.push(node_value);
      } else {
        results.push(node_value);
      }

      next_index++;
      let has_iterated_entire_ring = next_index === initial_index;
      if (has_iterated_entire_ring) break; //  Done all the way around -- terminate the loop regardless.
    }
    return { results, avoided: avoided_list }
  }
}


