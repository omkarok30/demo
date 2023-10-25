import { Rule } from 'antd/lib/form';

export const isExternalURL = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path);

interface SchemaValidatorOptions {
  action?: string;
  settings?: Map<string, any>;
}

export const schemaValidator = (yupSchema: any, { action, settings }: SchemaValidatorOptions): Rule[] => {
  const schema = yupSchema;

  return [
    (formInstance: any) => ({
      // message: 'Validation failed',
      async validator(rule: any, value: any) {
        const formValues = formInstance.getFieldsValue(true);
        // const settings = { year: 2022, loe_ug: '1', loe_pg: '1', loe_diploma: '0', loe_phd: '1' };
        const { field } = rule;
        // console.log('rule, value', { field }, value);
        try {
          await schema.validateSyncAt(field, { [field]: value }, { context: { formValues, settings } });
        }
        catch (e) {
          return Promise.reject(e);
        }
      },
    }),
  ];
};
