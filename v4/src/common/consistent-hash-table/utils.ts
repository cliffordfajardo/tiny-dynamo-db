export interface Map { [key: string]: any;}


/**
 * A binary search algorithm, that returns the index of the current item we are finding + 1.
 * Note, they array must be sorted before using this.
 * This is similar to python's builtin bisect module (ex: pytohn.bisect)
 * - https://www.youtube.com/watch?v=mqaf7vj1AdA
 * - https://github.com/aureooms/js-bisect/blob/master/src/bisect_right.js
 * @example
 * bisect([5,6,7], 7) => 3
 */
export function bisect(list: any[] , target: any , lo:number = 0 , hi:number = list.length ) {
  if ( lo < 0 ) throw new Error( "lo must be non-negative" ) ;
  while ( lo < hi ) {
      const mid = ( lo + hi ) / 2 | 0 ;
      if ( target < list[mid] ) hi = mid ;
      else lo = mid + 1 ;
  }
  return lo ;
}

/**
 * Clone an item. Works for any value type.
 */
export function deepClone(obj:any){
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  let newObj:Map = {};
  if (Array.isArray(obj)) {
    newObj = obj.map(item => deepClone(item));
  } else {
    Object.keys(obj).forEach((key:string) => {
      return newObj[key] = deepClone(obj[key]);
    })
  }
  return newObj;
}
