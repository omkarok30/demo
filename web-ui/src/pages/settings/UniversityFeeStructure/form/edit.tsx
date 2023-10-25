import { useLocation } from 'react-router-dom';
import React from 'react';
import { Card } from 'antd';
import { useUniversityFeeStructure } from '@/store/settings/useUniversityFeeStructure';
import * as modelUniversityFeeStructure from '@/models/settings/UniversityFeeStructure';
import FormContainer from '@/components/Form';

interface FormId {
  id?: string;
}

const InstituteForm = () => {
  const location = useLocation();
  const state = location.state as FormId;

  const { adduniversityfeestructure, universityfeestructure, getuniversityfeestructure, formLayout, updateuniversityfeestructure, clearuniversityfeestructure } = useUniversityFeeStructure(
    (state: any) => ({
      adduniversityfeestructure: state.adduniversityfeestructure,
      formLayout: state.layout,
      getuniversityfeestructure: state.getuniversityfeestructure,
      universityfeestructure: state.universityfeestructure,
      updateuniversityfeestructure: state.updateuniversityfeestructure,
      clearuniversityfeestructure: state.clearuniversityfeestructure,
    }),
  );

  React.useEffect(() => {
    if (state) {
      getuniversityfeestructure(state.id);
    }
    return () => {
      clearuniversityfeestructure();
    };
  }, [state]);

  const onFormSubmit = (values: any) => {
    if (state) {
      values.id = state.id;
      updateuniversityfeestructure(values);
    }
    else {
      adduniversityfeestructure(values);
    }
  };

  const headerLabel = state ? 'Edit University Fee Structure' : 'Add University Fee Structure';

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={headerLabel}
      >
        <FormContainer
          formInputs={modelUniversityFeeStructure.formInputs}
          onFormSubmit={onFormSubmit}
          formValues={universityfeestructure || []}
          formHeader={headerLabel}
          formLayout={formLayout}
        />
      </Card>
    </div>
  );
};

export default InstituteForm;
