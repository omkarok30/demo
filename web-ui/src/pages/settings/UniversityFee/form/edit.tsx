import { useLocation } from 'react-router-dom';
import React from 'react';
import { Card } from 'antd';
import { useUniversityFee } from '@/store/settings/useUniversityFee';
import * as modelUniversityFee from '@/models/settings/UniversityFee';
import FormContainer from '@/components/Form';

interface FormId {
  id?: string;
}

const InstituteForm = () => {
  const location = useLocation();
  const state = location.state as FormId;

  const { adduniversityfeehead, universityfeehead, getuniversityfeehead, formLayout, updateuniversityfeehead, clearuniversityfeehead } = useUniversityFee(
    (state: any) => ({
      adduniversityfeehead: state.adduniversityfeehead,
      formLayout: state.layout,
      getuniversityfeehead: state.getuniversityfeehead,
      universityfeehead: state.universityfeehead,
      updateuniversityfeehead: state.updateuniversityfeehead,
      clearuniversityfeehead: state.clearuniversityfeehead,
    }),
  );

  React.useEffect(() => {
    if (state) {
      getuniversityfeehead(state.id);
    }
    return () => {
      clearuniversityfeehead();
    };
  }, [state]);

  const onFormSubmit = (values: any) => {
    if (state) {
      values.id = state.id;
      updateuniversityfeehead(values);
    }
    else {
      adduniversityfeehead(values);
    }
  };

  const headerLabel = state ? 'Edit University Fees' : 'Add University Fees';

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={headerLabel}
      >
        <FormContainer
          formInputs={modelUniversityFee.formInputs}
          onFormSubmit={onFormSubmit}
          formValues={universityfeehead || []}
          formHeader={headerLabel}
          formLayout={formLayout} />
      </Card>
    </div>
  );
};

export default InstituteForm;
