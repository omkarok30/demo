import React from 'react';
import _ from 'lodash';

import { todoLookUps } from '@/store/todoLookUps';

export const ToolTypeAsText = (props) => {
  const [label, setLabel] = React.useState(props.value);
  React.useEffect(() => {
    const value = props.value;
    const r = _.find(todoLookUps.getState().toolType, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, todoLookUps.getState().toolType]);

  return <div>{label}</div>;
};
