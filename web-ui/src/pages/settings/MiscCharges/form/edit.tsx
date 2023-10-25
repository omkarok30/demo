import { useLocation } from 'react-router-dom';
import React from 'react';
import { Card } from 'antd';
import { useMiscCharges } from '@/store/settings/useMiscCharges';
import * as modelMiscCharges from '@/models/settings/MiscCharges';
import FormContainer from '@/components/Form';

interface FormId {
  id?: string;
}

const InstituteForm = () => {
  const location = useLocation();
  const state = location.state as FormId;

  const { addmisccharge, misccharge, getmisccharge, formLayout, updatemisccharge, clearmisccharge } = useMiscCharges(
    (state: any) => ({
      addmisccharge: state.addmisccharge,
      formLayout: state.layout,
      getmisccharge: state.getmisccharge,
      misccharge: state.misccharge,
      updatemisccharge: state.updatemisccharge,
      clearmisccharge: state.clearmisccharge,
    }),
  );

  React.useEffect(() => {
    if (state) {
      getmisccharge(state.id);
    }
    return () => {
      clearmisccharge();
    };
  }, [state]);

  const onFormSubmit = (values: any) => {
    if (state) {
      values.id = state.id;
      updatemisccharge(values);
    }
    else {
      addmisccharge(values);
    }
  };

  const headerLabel = state ? 'Edit Miscellaneous Charges' : 'Add Miscellaneous Charges Details';

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={headerLabel}
      >
        <FormContainer
          formInputs={modelMiscCharges.formInputs}
          onFormSubmit={onFormSubmit}
          formValues={misccharge || []}
          formHeader={headerLabel}
          formLayout={formLayout} />
      </Card>
    </div>);
};

export default InstituteForm;
