import React from 'react';
import _ from 'lodash';

import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { todoLookUps } from '@/store/todoLookUps';
// import { isEmptyValue } from '@/utils/object';
const optionsCurriculumComponent:any= todoLookUps.getState().curriculumComponent;

export const CurriculumAsText = (props) => {
  
  const storeAcademicYear = useAcademicYear((state: any) => ({ asOptions: state.asOptions, comboByName: state.comboByName }));
  React.useEffect(() => {
    storeAcademicYear.asOptions();
  });

  const [label, setLabel] = React.useState();

  React.useEffect(() => {
    const value = props.value;
    const r = optionsCurriculumComponent.find(e=>e.value===props.value)
    setLabel(_.get(r, ['label'], value));
  }, [props.value, storeAcademicYear.comboByName]);

  return (<div>{label}</div>);
};
