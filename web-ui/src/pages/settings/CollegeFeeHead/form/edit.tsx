import { useLocation } from 'react-router-dom';
import React from 'react';
import { Card } from 'antd';
import { useCollegeFeeHead } from '@/store/settings/useCollegeFeeHead';
import * as modelCollegeFeeHead from '@/models/settings/CollegeFeeHead';
import FormContainer from '@/components/Form';

interface FormId {
  id?: string;
}

const InstituteForm = () => {
  const location = useLocation();
  const state = location.state as FormId;

  const { addfeehead, feehead, getfeehead, formLayout, updatefeehead, clearfeehead } = useCollegeFeeHead(
    (state: any) => ({
      addfeehead: state.addfeehead,
      formLayout: state.layout,
      getfeehead: state.getfeehead,
      feehead: state.feehead,
      updatefeehead: state.updatefeehead,
      clearfeehead: state.clearfeehead,
    }),
  );

  React.useEffect(() => {
    if (state) {
      getfeehead(state.id);
    }
    return () => {
      clearfeehead();
    };
  }, [state]);

  const onFormSubmit = (values: any) => {
    if (state) {
      values.id = state.id;
      updatefeehead(values);
    }
    else {
      addfeehead(values);
    }
  };

  const headerLabel = state ? 'Edit College Fee Head' : 'Add College Fee Head';

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={headerLabel}
      >
        <FormContainer
          formInputs={modelCollegeFeeHead.formInputs}
          onFormSubmit={onFormSubmit}
          formValues={feehead || []}
          formHeader={headerLabel}
          formLayout={formLayout} />
      </Card>
    </div>);
};

export default InstituteForm;
