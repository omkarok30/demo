import React from 'react';
import _ from 'lodash';
import { todoLookUps } from '@/store/todoLookUps';

export const ClassAsText = (props) => {
  const classNames = todoLookUps.getState().className;

  const [label, setLabel] = React.useState(props.value);

  React.useEffect(() => {
    const value = props.value;
    const r = _.find(classNames, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, classNames]);

  return (<div>{label}</div>);
};
