import React from 'react';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';

export const UserNameAsText = (props) => {
  const userId = `${props.value}`;

  const { optionsEmployee, getRecords } = useEmployeeDetails((state: any) => ({
    optionsEmployee: state.optionsEmployee,
    getRecords: state.getRecords,
  }));

  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    getRecords();
  }, []);

  React.useEffect(() => {
    if (optionsEmployee) {
      const userRes = optionsEmployee.find((user: any) => user.value === userId);
      setUserName(userRes?.label);
    }
  }, [userId, optionsEmployee]);

  return (<>{userName || 'anonymous'}</>);
};
