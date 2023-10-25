import React from 'react';
import _ from 'lodash';

import { todoLookUps } from '@/store/todoLookUps';
import { useProgramDetails } from '@/store/settings/useProgramDetails';

export const YesNoAsText = (props: any) => {
  const yesNo = todoLookUps.getState().yesNo;
  const [label, setLabel] = React.useState(props.value);

  React.useEffect(() => {
    const value = props.value;
    const r = _.find(yesNo, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, yesNo]);
  return <div>{label}</div>;
};

export const ProgramAsText = (props: any) => {
  const storeProgramDetails = useProgramDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsAllPrograms: state.optionsAllPrograms,
  }));
  const [label, setLabel] = React.useState(props.value);
  React.useEffect(() => {
    storeProgramDetails.getRecords();
  }, []);
  React.useEffect(() => {
    const value = props.value;
    const r = _.find(storeProgramDetails.optionsAllPrograms, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, storeProgramDetails.optionsAllPrograms]);

  return <div>{label}</div>;
};
