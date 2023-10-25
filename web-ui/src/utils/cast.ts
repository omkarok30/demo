import moment from 'moment';
import _ from 'lodash';
import { isEmptyValue } from '@/utils/object';

const trueValues = ['1', 't', 'true', 'yes', 'ok', 'good', 'checked', 'check'];
export const isTrue = (value: any): boolean => {
  if (isEmptyValue(value)) {
    return false;
  }
  return trueValues.includes(String(value).toLowerCase());
};

export const asString = (value: any): string | null => {
  const inst = value?.constructor?.name || null;
  if (inst === 'String') {
    return value;
  }
  if (inst === 'Number') {
    return String(value);
  }
  if (inst === 'Array') {
    return JSON.stringify(value);
  }
  if (inst === 'Object') {
    return JSON.stringify(value);
  }
  if (inst === 'Date') {
    return moment(value).toString();
  }
  if (inst === 'Boolean') {
    return isTrue(value) ? 'true' : 'false';
  }
  return null;
};

export const asInteger = (value: any): Number | null => {
  const s = asString(value);
  if (isEmptyValue(value)) {
    return null;
  }
  const n = Number(s);
  if (isNaN(n) || !isFinite(n)) {
    return null;
  }
  return parseInt(n.toString(10), 10);
};

export const asFloat = (value: any): Number | null => {
  const s = asString(value);
  if (isEmptyValue(value)) {
    return null;
  }
  const n = Number(s);
  if (isNaN(n) || !isFinite(n)) {
    return null;
  }
  return parseFloat(n.toString(10));
};
export const asDate = (value: any): Date | moment.Moment | null => {
  const s = asString(value);
  if (isEmptyValue(value)) {
    return null;
  }
  const m = moment(s);
  if (m.isValid()) {
    return m;
  }
  return null;
};
export const asBool = (value: any): boolean => {
  const s = asString(value);
  return isTrue(s);
};

export const asJSON = (value: any): JSON | null => {
  const s = asString(value);
  if (s === null) {
    return null;
  }
  try {
    const json = JSON.parse(s);
    return json;
  }
  catch (e) {
    console.error('error parsing json', value);
    return null;
  }
};

export const convertValues = (values: any, allColumns: any) => {
  const data = _.cloneDeep(values);
  _.each(values, (value, key) => {
    // if (isEmptyValue(value)) {
    //   _.set(data, [key], undefined);
    //   return;
    // }
    const column = allColumns[key];
    if (isEmptyValue(column)) {
      return;
    }
    if (column.type === 'string') {
      _.set(data, [key], asString(value));
    }
    if (column.type === 'integer') {
      _.set(data, [key], asInteger(value));
    }
    if (column.type === 'float') {
      _.set(data, [key], asFloat(value));
    }
    if (column.type === 'date') {
      _.set(data, [key], asDate(value));
    }
    if (column.type === 'bool') {
      _.set(data, [key], asBool(value));
    }
    if (column.type === 'json') {
      _.set(data, [key], asJSON(value));
    }
  });
  return data;
};

export const convertForDisplay = (record: any, allColumns: any, global: any, keyColumn = 'id') => {
  const converted = convertValues(record, allColumns);
  const data = {};
  _.each(converted, (value, key) => {
    if (isEmptyValue(value)) {
      _.set(data, [key], '');
      return;
    }
    const column = allColumns[key];
    if (isEmptyValue(column)) {
      throw new Error(`Column not found ${key}`);
    }
    _.set(data, [key], value);
    // TODO:
    // if (column.type === 'string') {
    //   _.set(data, [key], value);
    // }
    // TODO:
    // if (column.type === 'integer') {
    //   _.set(data, [key], value);
    // }
    // TODO:
    // if (column.type === 'float') {
    //   _.set(data, [key], value);
    // }
    if (column.type === 'date') {
      _.set(data, [key], moment(value).format(global.displayDateFormat));
    }
    if (column.type === 'datetime') {
      _.set(data, [key], moment(value).format(global.displayDateTimeFormat));
    }
    // TODO:
    // if (column.type === 'bool') {
    //   _.set(data, [key], value);
    // }
  });

  const key = _.get(data, keyColumn, _.get(data, 'id'));
  _.set(data, ['key'], key);
  return data;
};

export const convertForSubmit = (values: any, allColumns: any, modelOnly = true) => {
  const data = _.cloneDeep(values);
  _.each(values, (value, key) => {
    if (isEmptyValue(value)) {
      _.set(data, [key], undefined);
      return;
    }
    if (modelOnly) {
      const column = allColumns[key];
      if (isEmptyValue(column)) {
        return;
      }
    }
    _.set(data, [key], asString(value));
  });
  return data;
};
