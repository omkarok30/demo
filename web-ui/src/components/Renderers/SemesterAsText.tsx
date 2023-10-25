import React from 'react';
import { todoLookUps } from '@/store/todoLookUps';

export const SemesterAsText = (props) => {
  const classNames = todoLookUps.getState().className;

  const [label, setLabel] = React.useState(props.value);

  React.useEffect(() => {
    const value = props.value;

    if (value === '1') {
      setLabel('SEMESTER I');
    }
    else if (value === '2') {
      setLabel('SEMESTER II');
    }
  }, [props.value, classNames]);

  return (<div>{label}</div>);
};
