import { useLocation } from 'react-router-dom';
import React from 'react';
import { Card } from 'antd';
import { useStudentInsuranceStructure } from '@/store/settings/useStudentInsuranceStructure';
import * as modelStudentInsuranceStructure from '@/models/settings/StudentInsuranceStructure';
import FormContainer from '@/components/Form';

interface FormId {
  id?: string;
}

const InstituteForm = () => {
  const location = useLocation();
  const state = location.state as FormId;

  const { addstudInsStruDetails, studInsStruDetail, getStudInsStructureDetail, formLayout, updatestudInsStruDetail, clearstudInsStruDetail } = useStudentInsuranceStructure(
    (state: any) => ({
      addstudInsStruDetails: state.addstudInsStruDetails,
      formLayout: state.layout,
      getStudInsStructureDetail: state.getStudInsStructureDetail,
      studInsStruDetail: state.studInsStruDetail,
      updatestudInsStruDetail: state.updatestudInsStruDetail,
      clearstudInsStruDetail: state.clearstudInsStruDetail,
    }),
  );

  React.useEffect(() => {
    if (state) {
      getStudInsStructureDetail(state.id);
    }
    return () => {
      clearstudInsStruDetail();
    };
  }, [state]);

  const onFormSubmit = (values: any) => {
    if (state) {
      values.id = state.id;
      updatestudInsStruDetail(values);
    }
    else {
      addstudInsStruDetails(values);
    }
  };

  const headerLabel = state ? 'Edit Student Insurance Structure' : 'Add Student Insurance Structure ';
  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={headerLabel}
      >
        <FormContainer
          formInputs={modelStudentInsuranceStructure.formInputs}
          onFormSubmit={onFormSubmit}
          formValues={studInsStruDetail || []}
          formHeader={headerLabel}
          formLayout={formLayout} />
      </Card>
    </div>
  );
};

export default InstituteForm;
