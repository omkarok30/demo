import React from 'react';
import _ from 'lodash';
import { todoLookUps } from '@/store/todoLookUps';

export const YesNoAsText = (props: any) => {
  const yesNo = todoLookUps.getState().yesNo;
  const [label, setLabel] = React.useState(props.value);

  React.useEffect(() => {
    const value = props.value;
    const r = _.find(yesNo, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, yesNo]);
  return <div>{label}</div>;
};
