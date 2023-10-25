import * as yup from 'yup';
export const createYupSchema = (schema: any, config) => {
  const { id, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    console.log(type, params);
    validator = validator[type](...params);
  });
  schema[id] = validator;
  return schema;
};
