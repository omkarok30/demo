import React from 'react';
import _ from 'lodash';
import { Button, Card, Col, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelAcademicYear from '@/models/settings/AcademicYear';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useSettings } from '@/store/settings/useSettings';

const AcademicYearList = () => {
  const navigate = useNavigate();

  const { allAcademicYearDetails, getAcademicYearDetail, getAcademicYearDetails } = useAcademicYear(
    (state: any) => ({
      allAcademicYearDetails: state.allRecords,
      academicYearDetail: state.academicYearDetail,
      deleteAcademicYearDetails: state.deleteAcademicYearDetails,
      getAcademicYearDetail: state.getAcademicYearDetail,
      getAcademicYearDetails: state.getAcademicYearDetails,
    }),
  );

  const settings = useSettings((state: any) => state.byKeys);
  console.log(settings);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      // getAcademicYearDetail(record?.id);
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
    // if (action === 'delete') {
    //   deleteAcademicYearDetails(record?.id);
    // }
  };

  React.useEffect(() => {
    fetchSettings();
    getAcademicYearDetails();
  }, [getAcademicYearDetails]);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelAcademicYear.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [<Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}>Edit</Button>],
    });
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Academic Year"
      >
        <Row justify="end" key="academicDepartment-header">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Year
            </Button>
          </Col>
        </Row>
        <Table bordered columns={columns} dataSource={allAcademicYearDetails} />
        {/* <TableContainer
          data={allAcademicYearDetails}
          columns={modelAcademicYear.columns(settings)}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        /> */}
      </Card>
    </div>
  );
};

export default AcademicYearList;
