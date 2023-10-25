import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Modal,
  Row,
  Select,
  Table,
} from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import { useSettings } from '@/store/settings/useSettings';
import { useDivisions } from '@/store/Academics/courseManagement/useDivisions';
import { useBatches } from '@/store/Academics/courseManagement/useBatches';

import * as modelDivisions from '@/models/fyacademics/courseManagement/Divisions';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { isEmptyValue } from '@/utils/object';
import { ClassAsText } from '@/components/Renderers/ClassAsText';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';

const DivisionsList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeDivisions = useDivisions((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    nofurtherChange: state.nofurtherChange,
  }));
  const storeBatches = useBatches((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    optionsAllPrograms: state.optionsAllPrograms,
  }));

  const optionsAcademicYear = storeAcademicYear.comboByName;
  const optionsPrograms = storeProgramDetails.optionsAllPrograms;
  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record, semester }) => {
    if (action === 'edit') {
      navigate(
        `../edit/${record?.id}/${record?.academicYear}/${record?.departmentId}/${record?.programId}/${record?.className}`,
        {
          state: { id: record?.id },
        },
      );
    }
    if (action === 'addbatch') {
      navigate(
        `../edit_batch/${record?.id}/${record?.academicYear}/${semester}/${record?.id}/${record?.departmentId}/${record?.programId}/${record?.className}`,
        { state: { id: record?.id } },
      );
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeAcademicYear.getAcademicYearDetails();
    storeProgramDetails.getRecords();
  }, [fetchSettings]);
  const [selectYear, setYear] = useState();
  const [academicYearLabel, setacademicYearLabel] = React.useState();
  const [selectProgram, setprogram] = useState();
  const [programLabel, setprogramLabel] = useState();
  const [className, setclassName] = useState();

  React.useEffect(() => {
    if (isEmptyValue(selectYear)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ['value'], '');
      const label = _.get(first, ['label'], '');
      setYear(value);
      setacademicYearLabel(label);
    }
    if (isEmptyValue(selectProgram)) {
      const firstProgram = _.first(optionsPrograms);
      const valueProgram = _.get(firstProgram, ['value'], '');
      const labelProgram = _.get(firstProgram, ['label'], '');

      setprogram(valueProgram);
      setprogramLabel(labelProgram);
    }
  }, [optionsAcademicYear]);
  React.useEffect(() => {
    if (isEmptyValue(selectProgram)) {
      const firstProgram = _.first(optionsPrograms);
      const valueProgram = _.get(firstProgram, ['value'], '');
      const labelProgram = _.get(firstProgram, ['label'], '');

      setprogram(valueProgram);
      setprogramLabel(labelProgram);
    }
  }, [optionsPrograms]);

  React.useEffect(() => {
    storeDivisions.getRecords(selectYear, selectProgram);
  }, [selectYear, selectProgram]);
  const setAcademicYear = (event) => {
    setYear(event);
    const value = event;
    const yearOptions = _.find(optionsAcademicYear, { value });
    const label = _.get(yearOptions, ['label'], '');
    setacademicYearLabel(label);
  };
  const setPrograms = (event) => {
    setprogram(event);
    const value = event;
    const programOptions = _.find(optionsPrograms, { value });
    const label = _.get(programOptions, ['label'], '');
    setprogramLabel(label);
  };

  const [openmodal, setopenmodal] = React.useState(false);
  const showModal = (classname) => {
    setclassName(classname);
    setopenmodal(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        storeDivisions.nofurtherChange(
          selectYear,
          selectProgram,
          values,
          className,
        );
        setopenmodal(false);
      })
      .catch(() => {
        notification.error({
          message: 'Validations failed',
        });
      });
  };

  const handleCancel = () => {
    setopenmodal(false);
  };
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
          children: <DepartmentAsText value={value} />,
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
        const obj = {
          children: <ClassAsText value={value} />,
          props: {},
        };
        /* if (index % 3 === 0) {
          obj.props.rowSpan = rowscnt;
        }
        if (index % 3 === 1) {
          obj.props.rowSpan = 0;
        }
        if (index % 3 === 2) {
          obj.props.rowSpan = 0;
        } */
        return obj;
      },
    });
    cols.push({
      title: 'Division',
      key: 'division',
      render: (_, record) => (
        <div>
          {record.division} <br></br>
          <Button
            style={{ background: '#314591', color: 'white' }}
            onClick={() =>
              handleActionClick({ action: 'edit', record, semester: '0' })
            }
          >
            Add/Update Division
          </Button>{' '}
          <Button
            style={{ background: '#314591', color: 'white' }}
            onClick={() => showModal(`${record.className}`)}
          >
            No Further Changes
          </Button>
        </div>
      ),
    });
    cols.push({
      title: 'Semester I No. of Batches',
      key: 'semester1batch',
      render: (_, record) => (
        <div>
          {record.semester1batch === null
            ? (
            <Button
              style={{ background: '#314591', color: 'white' }}
              onClick={() =>
                handleActionClick({ action: 'addbatch', record, semester: '1' })
              }
            >
              Add Batches
            </Button>
              )
            : (
            `${record.semester1batch} ` + `(${record.division})`
              )}
        </div>
      ),
    });
    cols.push({
      title: 'Semester II No. of Batches',
      key: 'semester2batch',
      render: (_, record) => (
        <div>
          {record.semester2batch === null
            ? (
            <Button
              style={{ background: '#314591', color: 'white' }}
              onClick={() =>
                handleActionClick({ action: 'addbatch', record, semester: '2' })
              }
            >
              Add Batches
            </Button>
              )
            : (
            `${record.semester2batch} ` + ` (${record.division})`
              )}
        </div>
      ),
    });
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Divisions & Batches">
        <Divider orientation="left" plain></Divider>

        <Modal
          title="Confirmation for No Further Changes"
          open={openmodal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form layout="vertical">
            <label>
              <b>Academic Year: <div>{academicYearLabel}</div></b>
            </label>

            <label>
              <b>Program:<div>{programLabel}</div> </b>
            </label>
            <label>
              <b>Class: <ClassAsText value={className}></ClassAsText></b>
            </label>
          </Form>
        </Modal>
        <Form layout="horizontal">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Academic Year">
                <Select
                  style={{ width: '100%' }}
                  value={selectYear}
                  options={optionsAcademicYear}
                  onChange={event => setAcademicYear(event)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Program">
                <Select
                  style={{ width: '100%' }}
                  value={selectProgram}
                  options={optionsPrograms}
                  onChange={event => setPrograms(event)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {storeDivisions.allRecords?.map((item: any) => {
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
            newRecord.semester1batch
              = sem1divisionWiseRecord[0].numberOfBatches;
          }
          else {
            newRecord.semester1batch = null;
          }
          if (!isEmptyValue(sem2divisionWiseRecord)) {
            newRecord.semester2batch
              = sem2divisionWiseRecord[0].numberOfBatches;
          }
          else {
            newRecord.semester2batch = null;
          }
          divisionsdata.push(newRecord);
        })}
        <Table bordered columns={columns} dataSource={divisionsdata} />
      </Card>
    </div>
  );
};

export default DivisionsList;
