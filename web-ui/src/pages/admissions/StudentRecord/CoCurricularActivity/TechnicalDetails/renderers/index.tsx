import React from 'react';
import _ from 'lodash';

import { todoLookUps } from '@/store/todoLookUps';

export const EventLevelAsText = (props: any) => {
  const eventoptions = todoLookUps.getState().eventLevel;
  const [label, setLabel] = React.useState(props.value);

  React.useEffect(() => {
    const value = props.value;
    const r = _.find(eventoptions, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, eventoptions]);

  return <div>{label}</div>;
};
export const ParticipationTypeAsText = (props: any) => {
  const participationoptions = todoLookUps.getState().participationType;
  const [label, setLabel] = React.useState(props.value);
  React.useEffect(() => {
    const value = props.value;
    const r = _.find(participationoptions, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, participationoptions]);
  return <div>{label}</div>;
};
export const CountryAsText = (props: any) => {
  const countryoptions = todoLookUps.getState().country;
  const [label, setLabel] = React.useState(props.value);
  React.useEffect(() => {
    const value = props.value;
    const r = _.find(countryoptions, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, countryoptions]);
  return <div>{label}</div>;
};
