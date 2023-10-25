import { useLocation } from 'react-router-dom';
import React from 'react';
import { Card } from 'antd';
import { useCollegeFeeStructure } from '@/store/settings/useCollegeFeeStructure';
import * as modelCollegeFeeStructure from '@/models/settings/CollegeFeeStructure';
import FormContainer from '@/components/Form';

interface FormId {
  id?: string;
}

const InstituteForm = () => {
  const location = useLocation();
  const state = location.state as FormId;

  const { addfeestructure, feestructure, getfeestructure, formLayout, updatefeestructure, clearfeestructure } = useCollegeFeeStructure(
    (state: any) => ({
      addfeestructure: state.addfeestructure,
      formLayout: state.layout,
      getfeestructure: state.getfeestructure,
      feestructure: state.feestructure,
      updatefeestructure: state.updatefeestructure,
      clearfeestructure: state.clearfeestructure,
    }),
  );

  React.useEffect(() => {
    if (state) {
      getfeestructure(state.id);
    }
    return () => {
      clearfeestructure();
    };
  }, [state]);

  const onFormSubmit = (values: any) => {
    if (state) {
      values.id = state.id;
      updatefeestructure(values);
    }
    else {
      addfeestructure(values);
    }
  };

  const headerLabel = state ? 'Edit College Fee Structure' : 'Add College Fee Structure Head';
  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={headerLabel}
      >
        <FormContainer
          formInputs={modelCollegeFeeStructure.formInputs}
          onFormSubmit={onFormSubmit}
          formValues={feestructure || []}
          formHeader={headerLabel}
          formLayout={formLayout} />
      </Card>
    </div>);
};

export default InstituteForm;
