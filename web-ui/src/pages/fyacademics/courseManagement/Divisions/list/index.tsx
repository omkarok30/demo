import React, { useState } from 'react';
import { Button, Card, Col, Divider, Modal, Row, Select, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import { useSettings } from '@/store/settings/useSettings';
import { useDivisions } from '@/store/fyacademics/courseManagement/useDivisions';
import { useBatches } from '@/store/fyacademics/courseManagement/useBatches';

import * as modelDivisions from '@/models/fyacademics/courseManagement/Divisions';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { isEmptyValue } from '@/utils/object';
import { ClassAsText } from '@/components/Renderers/ClassAsText';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const DivisionsList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeDivisions = useDivisions((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }),
  );
  const storeBatches = useBatches((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }),
  );
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const optionsAcademicYear = storeAcademicYear.comboByName;
  const [academicYearLabel, setacademicYearLabel] = useState();

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };
  const [selectYear, setYear] = useState();

  const handleActionChange = (event) => {
    setYear(event);
    const value = event;
    storeDivisions.getRecords(event);
    storeBatches.getRecords(event);
    const yearOptions = _.find(optionsAcademicYear, { value });
    const label = _.get(yearOptions, ['label'], '');
    setacademicYearLabel(label);
  };
  const handleActionClick = ({ action, record, semester }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}/${record?.academicYear}`, { state: { id: record?.id } });
    }
    if (action === 'addbatch') {
      navigate(`../edit_batch/${record?.id}/${record?.academicYear}/${semester}/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    if (isEmptyValue(selectYear)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ['value'], '');
      setYear(value);
      const label = _.get(first, ['label'], '');
      setacademicYearLabel(label);
    }
    storeDivisions.getRecords(selectYear);
    storeBatches.getRecords(selectYear);
  }, [selectYear]);

  React.useEffect(() => {
    fetchSettings();
    storeAcademicYear.getAcademicYearDetails();
    storeDivisions.getRecords(selectYear);
  }, []);
  const { confirm } = Modal;
  function showConfirm(record) {
    const value = record.academicYear;
    const yearOptions = _.find(optionsAcademicYear, { value });
    const label = <YearAsText value={value}/>;
    console.log(record?.academicYear);
    confirm({
      title: 'Confirmation for No Further Changes',
      content: `Academic Year:${label}  Class:First Year`,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          updateRecord(id, values);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }
  const divisionsdata = [];
  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelDivisions.columns(settings);
    let rowscnt = 0;

    cols.push({
      title: 'Department',
      dataIndex: 'departmentId',
      render: (value, row, index) => {
        rowscnt++;
        const obj = {
          children: 'First Year Department',
          props: {},
        };
        if (index % 3 === 0) {
          obj.props.rowSpan = rowscnt;
        }
        // These two are merged into above cell
        if (index % 3 === 1) {
          obj.props.rowSpan = 0;
        }
        if (index % 3 === 2) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },

    });

    cols.push({
      title: 'Class',
      dataIndex: 'className',
      render: (value, row, index) => {
        rowscnt++;
        console.log(index);
        console.log("hi",rowscnt);
        const obj = {
          children: <ClassAsText value={value} />,
          props: {},
        };
        if (index % 3 === 0) {
          obj.props.rowSpan = rowscnt;
        }
        // These two are merged into above cell
        if (index % 3 === 1) {
          obj.props.rowSpan = 0;
        }
        if (index % 3 === 2) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    });
    cols.push({
      title: 'Division',
      key: 'division',
      render: (_, record) => <div>{record.division} <br></br><Button style={{ background: '#314591', color: 'white' }} onClick={() => handleActionClick({ action: 'edit', record, semester: '0' })}>Add/Update Division</Button>  <Button style={{ background: '#314591', color: 'white' }} onClick={() => showConfirm({ record })}>No Further Changes</Button></div>,
    });
    cols.push({
      title: 'Semester I No. of Batches',
      key: 'semester1batch',
      render: (_, record) => <div>{ record.semester1batch === null ? <Button style={{ background: '#314591', color: 'white' }} onClick={() => handleActionClick({ action: 'addbatch', record, semester: '1' })}>Add Batches</Button> : `${record.semester1batch} ` + `(${record.division})` }</div>,
    });
    cols.push({
      title: 'Semester II No. of Batches',
      key: 'semester2batch',
      render: (_, record) => <div>{ record.semester2batch === null ? <Button style={{ background: '#314591', color: 'white' }} onClick={() => handleActionClick({ action: 'addbatch', record, semester: '2' })}>Add Batches</Button> : `${record.semester2batch} ` + ` (${record.division})` }</div>,
    });
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Divisions & Batches"
      >

          <Row>
            <Col>
              <Space>
                Academic Year:
                <Select
                  style={{ width: 400 }}
                  value={selectYear}
                  options={optionsAcademicYear}
                  onChange={(value) => {
                    setYear(value);
                  }}

                />
              </Space>
            </Col>
            </Row>
            <Divider orientation="left" plain></Divider>

            {
               storeDivisions.allRecords?.map((item: any) => {
                 const sem1divisionWiseRecord = _.filter(
                   storeBatches.allRecords,
                   record => record.division === item.id && record.semester === '1',
                 );

                 const sem2divisionWiseRecord = _.filter(
                   storeBatches.allRecords,
                   record => record.division === item.id && record.semester === '2',
                 );
                 const newRecord = item;
                 if (!isEmptyValue(sem1divisionWiseRecord)) {
                   newRecord.semester1batch = sem1divisionWiseRecord[0].numberOfBatches;
                 }
                 else {
                   newRecord.semester1batch = null;
                 }
                 if (!isEmptyValue(sem2divisionWiseRecord)) {
                   newRecord.semester2batch = sem2divisionWiseRecord[0].numberOfBatches;
                 }
                 else {
                   newRecord.semester2batch = null;
                 }
                 divisionsdata.push(newRecord);
               })

            }
        <Table bordered columns={columns} dataSource={divisionsdata} />
      </Card>
    </div>
  );
};

export default DivisionsList;
function strtoupper(division: any): React.ReactNode {
  throw new Error('Function not implemented.');
}
