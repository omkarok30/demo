import React from 'react';
import _ from 'lodash';

import { todoLookUps } from '@/store/todoLookUps';

export const PublicationTypeAsText = (props: any) => {
  const publicationoptions = todoLookUps.getState().publicationType;
  const [label, setLabel] = React.useState(props.value);
  React.useEffect(() => {
    const value = props.value;
    const r = _.find(publicationoptions, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, publicationoptions]);
  return <div>{label}</div>;
};
export const PaperTypeText = (props: any) => {
  const paperoptions = todoLookUps.getState().typeOfPaper;
  const [label, setLabel] = React.useState(props.value);
  React.useEffect(() => {
    const value = props.value;
    const r = _.find(paperoptions, { value });
    setLabel(_.get(r, ['label'], value));
  }, [props.value, paperoptions]);
  return <div>{label}</div>;
};
