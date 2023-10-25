import React from 'react';
import { todoLookUps } from '@/store/todoLookUps';

export const TrimesterAsText = (props) => {
  const classNames = todoLookUps.getState().className;

  const [label, setLabel] = React.useState(props.value);

  React.useEffect(() => {
    const value = props.value;

    if (value === '1') {
      setLabel('TERM I');
    }
    else if (value === '2') {
      setLabel('TERM II');
    }
    else if (value === '3') {
      setLabel('TERM III');
    }
  }, [props.value, classNames]);

  return (<div>{label}</div>);
};
