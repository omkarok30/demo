import React from 'react';
import _ from 'lodash';

import { useAcademicYear } from '@/store/settings/useAcademicYear';
// import { isEmptyValue } from '@/utils/object';

export const YearAsText = (props) => {
  const storeAcademicYear = useAcademicYear((state: any) => ({ asOptions: state.asOptions, comboByName: state.comboByName }));
  React.useEffect(() => {
    storeAcademicYear.asOptions();
  });

  const [label, setLabel] = React.useState(props.value);

  React.useEffect(() => {
    const value = props.value;
    const r = _.find(storeAcademicYear.comboByName, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, storeAcademicYear.comboByName]);

  return (<div>{label}</div>);
};
