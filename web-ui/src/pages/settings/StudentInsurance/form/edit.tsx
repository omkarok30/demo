import { useLocation } from 'react-router-dom';
import React from 'react';
import { Card } from 'antd';
import { useStudentInsurance } from '@/store/settings/useStudentInsurance';
import * as modelStudentInsurance from '@/models/settings/StudentInsurance';
import FormContainer from '@/components/Form';

interface FormId {
  id?: string;
}

const InstituteForm = () => {
  const location = useLocation();
  const state = location.state as FormId;

  const { addInsuranceDetails, insuranceDetail, getInsuranceDetail, formLayout, updateInsuranceDetail, clearInsuranceDetail } = useStudentInsurance(
    (state: any) => ({
      addInsuranceDetails: state.addInsuranceDetails,
      formLayout: state.layout,
      getInsuranceDetail: state.getInsuranceDetail,
      insuranceDetail: state.insuranceDetail,
      updateInsuranceDetail: state.updateInsuranceDetail,
      clearInsuranceDetail: state.clearInsuranceDetail,
    }),
  );

  React.useEffect(() => {
    if (state) {
      getInsuranceDetail(state.id);
    }
    return () => {
      clearInsuranceDetail();
    };
  }, [state]);

  const onFormSubmit = (values: any) => {
    if (state) {
      values.id = state.id;
      updateInsuranceDetail(values);
    }
    else {
      addInsuranceDetails(values);
    }
  };

  const headerLabel = state ? 'Edit Student Insurance' : 'Add Student Insurance';

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={headerLabel}
      >
        <FormContainer
          formInputs={modelStudentInsurance.formInputs}
          onFormSubmit={onFormSubmit}
          formValues={insuranceDetail || []}
          formHeader={headerLabel}
          formLayout={formLayout} />
      </Card>
    </div>
  );
};

export default InstituteForm;
