import React from 'react';
import _, { upperCase } from 'lodash';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import { isEmptyValue } from '@/utils/object';
export const EmployeeAsText = (props: any) => {
  const storeEWmployee = useEmployeeDetails((state: any) => ({
    getRecord: state.getRecords,
    optionsEmployee: state.optionsEmployee,
  }));

  const [label, setLabel] = React.useState(props.value);
  React.useEffect(() => {
    storeEWmployee.getRecord(props.value);
  }, []);
  React.useEffect(() => {
    const empids = props.value;
    let employeeNames = '';
    if (!isEmptyValue(empids)) {
      for (let i = 0; i < empids.length; i++) {
        const value = empids[i];
        const r = _.find(storeEWmployee.optionsEmployee, { value });
        employeeNames += _.get(r, ['label'], value);
      }
    }

    setLabel(upperCase(employeeNames));
  }, [props.value, '']);

  return <div>{label}</div>;
};
