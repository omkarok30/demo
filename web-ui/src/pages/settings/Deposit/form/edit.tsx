import { useLocation } from 'react-router-dom';
import React from 'react';
import { Card } from 'antd';
import { useDeposit } from '@/store/settings/useDeposit';
import * as modelDeposit from '@/models/settings/Deposit';
import FormContainer from '@/components/Form';

interface FormId {
  id?: string;
}

const InstituteForm = () => {
  const location = useLocation();
  const state = location.state as FormId;

  const { addDepositDetails, depositDetail, getDepositDetail, formLayout, updateDepositDetail, clearDepositDetail } = useDeposit(
    (state: any) => ({
      addDepositDetails: state.addDepositDetails,
      formLayout: state.layout,
      getDepositDetail: state.getDepositDetail,
      depositDetail: state.depositDetail,
      updateDepositDetail: state.updateDepositDetail,
      clearDepositDetail: state.clearDepositDetail,
    }),
  );

  React.useEffect(() => {
    if (state) {
      getDepositDetail(state.id);
    }
    return () => {
      clearDepositDetail();
    };
  }, [state]);

  const onFormSubmit = (values: any) => {
    if (state) {
      values.id = state.id;
      updateDepositDetail(values);
    }
    else {
      addDepositDetails(values);
    }
  };

  const headerLabel = state ? 'Edit Deposits Details' : 'Add Deposit Details';
  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={headerLabel}
      >
        <FormContainer
          formInputs={modelDeposit.formInputs}
          onFormSubmit={onFormSubmit}
          formValues={depositDetail || []}
          formHeader={headerLabel}
          formLayout={formLayout} />
      </Card>
    </div>);
};

export default InstituteForm;
