import React from 'react';
import _ from 'lodash';

import { todoLookUps } from '@/store/todoLookUps';

interface Options {
  value: string;
  fieldName: string;
}

export const OptionAsText = ({ value, fieldName }: Options) => {
  const modeoptions = todoLookUps.getState();
  const getOptions = modeoptions[fieldName];
  if (!getOptions) {
    <></>;
  }
  const [label, setLabel] = React.useState(value);
  React.useEffect(() => {
    const r = _.find(getOptions, { value });
    setLabel(_.get(r, ['label'], value));
  }, [value, getOptions]);
  return <div>{label}</div>;
};
