import React from 'react';
import _ from 'lodash';

import { todoLookUps } from '@/store/todoLookUps';

export const ModeAsText = (props: any) => {
  const modeoptions = todoLookUps.getState().mode;
  const [label, setLabel] = React.useState(props.value);
  React.useEffect(() => {
    const value = props.value;
    const r = _.find(modeoptions, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, modeoptions]);
  return <div>{label}</div>;
};
