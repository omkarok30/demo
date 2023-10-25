import React from 'react';
import { upperCase } from 'lodash';
import { useDivisions } from '@/store/Academics/courseManagement/useDivisions';
export const DivisionAsText = (props: any) => {
  const storeDivision = useDivisions((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
  }));

  const [label, setLabel] = React.useState(props.value);
  React.useEffect(() => {
    storeDivision.getRecord(props.value);
  }, []);
  React.useEffect(() => {
    const value = props.value;
    setLabel(upperCase(storeDivision.current?.division));
  }, [props.value, storeDivision.current]);

  return <div>{label}</div>;
};
