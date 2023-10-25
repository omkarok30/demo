import React from 'react';
import _ from 'lodash';

import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';

export const DepartmentAsText = (props: any) => {
  const storeAcademicDepartment = useAcademicDepartment((state: any) => ({
    asDepartmentOptions: state.asDepartmentOptions,
    allDepartments: state.comboByName,

  }));
  React.useMemo(() => storeAcademicDepartment.asDepartmentOptions() || [], []);
  const deptoptions = storeAcademicDepartment.allDepartments;
  const [label, setLabel] = React.useState(props.value);

  React.useEffect(() => {
    //debugger;
    const value = props.value;
    const r = _.find(deptoptions, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, deptoptions]);

  return (<div>{label}</div>);
};
