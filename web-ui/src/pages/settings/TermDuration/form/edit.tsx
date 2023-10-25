import { useLocation } from 'react-router-dom';
import React from 'react';
import { Card } from 'antd';
import { useTermDuration } from '@/store/settings/useTermDuration';
import * as modelTermDuration from '@/models/settings/TermDuration';
import FormContainer from '@/components/Form';

interface FormId {
  id?: string;
}

const InstituteForm = () => {
  const location = useLocation();
  const state = location.state as FormId;

  const { addtermduration, termduration, gettermduration, formLayout, updatetermduration, cleartermduration } = useTermDuration(
    (state: any) => ({
      addtermduration: state.addtermduration,
      formLayout: state.layout,
      gettermduration: state.gettermduration,
      termduration: state.termduration,
      updatetermduration: state.updatetermduration,
      cleartermduration: state.cleartermduration,
    }),
  );

  React.useEffect(() => {
    if (state) {
      gettermduration(state.id);
    }
    return () => {
      cleartermduration();
    };
  }, [state]);

  const onFormSubmit = (values: any) => {
    if (state) {
      values.id = state.id;
      updatetermduration(values);
    }
    else {
      addtermduration(values);
    }
  };

  const headerLabel = state ? 'Edit Term Duration' : 'Add Term Duration';

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={headerLabel}
      >
        <FormContainer
          formInputs={modelTermDuration.formInputs}
          onFormSubmit={onFormSubmit}
          formValues={termduration || []}
          formHeader={headerLabel}
          formLayout={formLayout}
        />
      </Card>
    </div>
  );
};

export default InstituteForm;
