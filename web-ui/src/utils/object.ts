import _ from 'lodash';
import { ParsedQuery } from 'query-string';

// Shallow comparison of two objects, whether the keys of json are consistent
export function equalObjectKey(obj1: Object, obj2: Object): boolean {
  const obj1Keys: string[] = Object.keys(obj1);
  const obj2Keys: string[] = Object.keys(obj2);
  const obj1KeysLen: number = obj1Keys.length;
  if (obj1KeysLen !== obj2Keys.length) {
    return false;
  }
  let is = true;
  for (let index = 0; index < obj1KeysLen; index++) {
    const element: string = obj1Keys[index];
    if (!Object.prototype.hasOwnProperty.call(obj2, element)) {
      is = false;
      break;
    }
  }
  return is;
}

// Shallow comparison of two objects for equality, the values of these two objects can only be numbers or strings
export function equalObject(obj1: ParsedQuery, obj2: ParsedQuery): boolean {
  const obj1Keys: string[] = Object.keys(obj1);
  const obj2Keys: string[] = Object.keys(obj2);
  const obj1KeysLen: number = obj1Keys.length;
  const obj2KeysLen: number = obj2Keys.length;
  if (obj1KeysLen !== obj2KeysLen) {
    return false;
  }

  if (obj1KeysLen === 0 && obj2KeysLen === 0) {
    return true;
  }

  return !obj1Keys.some(key => obj1[key] !== obj2[key]);
}

export const isEmptyValue = (value: any) => {
  if (value === undefined) {
    return true;
  }
  if (value === null) {
    return true;
  }
  const inst = value?.constructor?.name || null;
  if (inst === 'String') {
    return value.trim().length === 0;
  }
  if (inst === 'Number') {
    return Number.isNaN(value);
  }
  if (inst === 'Array') {
    return value.length === 0;
  }
  if (inst === 'Object') {
    return (Object.keys(value) === null || Object.keys(value).length === 0);
  }
  // Returns false if it's instance of Date, Promise, Error or typeof Boolean
  if (['Date', 'Promise', 'Error', 'Boolean'].includes(inst)) {
    return false;
  }
  if (['Map', 'Set'].includes(inst)) {
    return value.size === 0;
  }
  return !value;
};

export const isStringsArray = (value: any) => {
  const inst = value?.constructor?.name || null;
  if (inst !== 'Array') {
    return false;
  }
  return _.every(value, v => typeof v === 'string');
};
