import React from 'react';
import { Button, Card, Col, Row } from 'antd';
// import { useNavigate } from 'react-router-dom';
import TableContainer from '@/components/Table';
import { useFYAcademicType } from '@/store/settings/useFYAcademicType';
import * as modelFYAcademicType from '@/models/settings/fyAcademicsType';

const fyacademicstype = () => {
  // const navigate = useNavigate();

  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const { fytypeyearsdata, getFYAcademicsYears, updateFYtype } = useFYAcademicType(
    (state: any) => ({
      fytypeyearsdata: state.fytypeyearsdata,
      getFYAcademicsYears: state.getFYAcademicsYears,
      updateFYtype: state.updateFYtype,
    }),
  );

  const handleActionClick = (value: any) => {
    if (value?.action === 'changetype') {
      updateFYtype(value?.id);
    }
  };

  React.useEffect(() => {
    getFYAcademicsYears();
  }, [getFYAcademicsYears]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="FY Academics Type"
      >
        <Row key="bank-header" justify="end">
        </Row>
        <TableContainer
          data={fytypeyearsdata}
          columns={modelFYAcademicType.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
      </Card>
    </div>
  );
};
export default fyacademicstype;
