import React from 'react';
import _ from 'lodash';
import { Button, Card, Col, Divider, Row, Select, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ColumnType, ColumnsType } from 'antd/lib/table';
import { When } from 'react-if';

import IntakeModal from '../form/IntakeModal';
import NomenclatureModal from '../form/NomenclatureModal';
import * as modelProgramDetails from '@/models/settings/ProgramDetails';
import * as ProgramIntakeDetails from '@/models/settings/ProgramIntakeDetails';
import * as ProgramNomenclatureDetails from '@/models/settings/ProgramNomenclatureDetails';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { useProgramIntakeDetails } from '@/store/settings/useProgramIntakeDetails';
import { useProgramNomenclatureDetails } from '@/store/settings/useProgramNomenclatureDetails';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { YesNoAsText } from '@/pages/settings/ProgramDetails/renderers';

import { attachRenderer } from '@/utils/tableExtras';
import { isEmptyValue } from '@/utils/object';

const renderers = {
  startYear: (value: string) => <YearAsText value={value} />,
  closeYear: (value: string) => <YearAsText value={value} />,
  departmentId: (value: string) => <DepartmentAsText value={value} />,
  batchFromYear: (value: string) => <YearAsText value={value} />,
  batchToYear: (value: string) => <YearAsText value={value} />,
  fromYear: (value: string) => <YearAsText value={value} />,
  toYear: (value: string) => <YearAsText value={value} />,
  sameasstudentcode: (value: string) => <YesNoAsText value={value} />,
};

const programTypes = [
  { value: 'institute', label: 'Institute Level Programs' },
  { value: 'department', label: 'Department Level Programs' },
];

const ProgramDetailsList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    getDepartmentRecords: state.getDepartmentRecords,
    allInstituteRecords: state.allInstituteRecords,
    allDepartmentRecords: state.allDepartmentRecords,
    optionsInstitutePrograms: state.optionsInstitutePrograms,
    optionsDepartmentPrograms: state.optionsDepartmentPrograms,
  }));

  const [selectedProgramType, setSelectedProgramType] =
    React.useState('institute');
  const storeProgramIntake = useProgramIntakeDetails((state: any) => ({
    intakeRecords: state.allRecords,
    getRecords: state.getRecords,
    allowNew: state.allowNew,
  }));
  const storeProgramNomenclature = useProgramNomenclatureDetails(
    (state: any) => ({
      nomenclatureRecords: state.allRecords,
      getRecords: state.getRecords,
      allowNew: state.allowNew,
    })
  );

  const [intakeProps, setIntakeProps] = React.useState({
    open: false,
    program: '',
    id: '',
  });
  const [nomenclatureProps, setNomenclatureProps] = React.useState({
    open: false,
    program: '',
    id: '',
  });

  const intakeOk = (program: string, _values: any) => {
    storeProgramIntake.getRecords(program);
    setIntakeProps({ ...intakeProps, open: false, program: '', id: '' });
  };
  const intakeCancel = () => {
    setIntakeProps({ ...intakeProps, open: false, program: '', id: '' });
  };

  const nomenclatureOk = (program: string, _values: any) => {
    storeProgramNomenclature.getRecords(program);
    setIntakeProps({ ...intakeProps, open: false, program: '', id: '' });
  };
  const nomenclatureCancel = () => {
    setNomenclatureProps({
      ...nomenclatureProps,
      open: false,
      program: '',
      id: '',
    });
  };

  const navigateToNewForm = (programType: string) => {
    navigate(`../edit/new/${programType}`);
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}/${record?.programType}`, {
        state: { id: record?.id },
      });
    }
  };

  const storeAcademicDepartment = useAcademicDepartment((state: any) => ({
    getDepartmentOptions: state.asDepartmentOptions,
    allDepartments: state.comboByName,
  }));

  React.useEffect(() => {
    fetchSettings();
    storeProgramDetails.getRecords();
    storeAcademicDepartment.getDepartmentOptions();
  }, []);

  const [selectInstituteProgram, setInstituteProgram] = React.useState('');
  const selectInstituteProgramRef = React.useRef('');
  React.useEffect(() => {
    const first = _.first(storeProgramDetails.optionsInstitutePrograms);
    const value = _.get(first, ['value'], '');
    setInstituteProgram(value);
  }, [storeProgramDetails.optionsInstitutePrograms]);

  React.useEffect(() => {
    if (isEmptyValue(selectInstituteProgram)) {
      return;
    }
    selectInstituteProgramRef.current = selectInstituteProgram;
    storeProgramIntake.getRecords(selectInstituteProgram);
    storeProgramNomenclature.getRecords(selectInstituteProgram);
  }, [selectInstituteProgram]);

  const [selectDepartment, setDepartment] = React.useState('');
  React.useEffect(() => {
    if (isEmptyValue(selectDepartment)) {
      const first = _.first(storeAcademicDepartment.allDepartments);
      const value = _.get(first, ['value'], '');
      setDepartment(value);
    }
  }, [storeAcademicDepartment.allDepartments]);

  React.useEffect(() => {
    if (isEmptyValue(selectDepartment)) {
      return;
    }
    storeProgramDetails.getDepartmentRecords(selectDepartment);
  }, [selectDepartment]);

  const [selectDepartmentProgram, setDepartmentProgram] = React.useState('');
  React.useEffect(() => {
    const first = _.first(storeProgramDetails.optionsDepartmentPrograms);
    const value = _.get(first, ['value'], '');
    setDepartmentProgram(value);
  }, [storeProgramDetails.optionsDepartmentPrograms]);

  React.useEffect(() => {
    if (isEmptyValue(selectDepartmentProgram)) {
      return;
    }
    storeProgramIntake.getRecords(selectDepartmentProgram);
    storeProgramNomenclature.getRecords(selectDepartmentProgram);
  }, [selectDepartmentProgram]);

  const [columnsInstitute, columnsDepartment] = React.useMemo(() => {
    let cols = modelProgramDetails.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          Edit
        </Button>,
      ],
    });
    cols = attachRenderer(cols, renderers);
    const colsIns = _.filter(
      cols,
      (col: ColumnType<any>) => col.dataIndex !== 'departmentId'
    );
    return [colsIns, cols];
  }, [settings]);

  const editIntake = (record: any) => {
    setIntakeProps({
      ...intakeProps,
      open: true,
      program: selectInstituteProgramRef.current,
      id: record?.id,
    });
  };
  const intakeColumns: ColumnsType<any> = React.useMemo(() => {
    let cols = ProgramIntakeDetails.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => {
            editIntake(record);
          }}
        >
          Edit
        </Button>,
      ],
      // render: (_, record) => [<Button type="link" onClick={editIntake(record)}>Edit</Button>],
    });
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);

  const editNomenclature = (record: any) => {
    setNomenclatureProps({
      ...nomenclatureProps,
      open: true,
      program: selectInstituteProgramRef.current,
      id: record?.id,
    });
  };
  const nomenclatureColumns: ColumnsType<any> = React.useMemo(() => {
    let cols = ProgramNomenclatureDetails.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => {
            editNomenclature(record);
          }}
        >
          Edit
        </Button>,
      ],
    });
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);

  const selectProgramType = (value: string) => {
    setSelectedProgramType(value);
  };

  return (
    <div className="layout-main-content">
      <Card
        bordered={false}
        title={
          <>
            Programs:{' '}
            <Select
              options={programTypes}
              defaultValue="institute"
              value={selectedProgramType}
              style={{ width: 300 }}
              onChange={selectProgramType}
            />
          </>
        }
      >
        <When condition={selectedProgramType === 'institute'}>
          <Divider orientation="left">Program Information</Divider>
          <Row justify="end">
            <Col>
              <Button
                type="primary"
                onClick={() => navigateToNewForm('institute')}
              >
                Add Program
              </Button>
            </Col>
          </Row>
          <Table
            bordered
            columns={columnsInstitute}
            dataSource={storeProgramDetails.allInstituteRecords}
            scroll={{ x: true }}
          />

          <Row>
            <Col>
              <Space>
                Program:
                <Select
                  style={{ width: 400 }}
                  value={selectInstituteProgram}
                  options={storeProgramDetails.optionsInstitutePrograms}
                  onChange={(value) => {
                    setInstituteProgram(value);
                  }}
                />
              </Space>
            </Col>
          </Row>

          <Divider orientation="left">Intake Information</Divider>
          <Table
            bordered
            columns={intakeColumns}
            dataSource={storeProgramIntake.intakeRecords}
            scroll={{ x: true }}
            title={() => (
              <Row justify="end">
                <Col>
                  <Button
                    type="primary"
                    disabled={!storeProgramIntake.allowNew}
                    onClick={() => {
                      setIntakeProps({
                        ...intakeProps,
                        open: true,
                        program: selectInstituteProgram,
                        id: 'new',
                      });
                    }}
                  >
                    Add Intake
                  </Button>
                </Col>
              </Row>
            )}
          />

          <Divider orientation="left">Nomenclature Information</Divider>
          <Table
            bordered
            columns={nomenclatureColumns}
            dataSource={storeProgramNomenclature.nomenclatureRecords}
            scroll={{ x: true }}
            title={() => (
              <Row justify="end">
                <Col>
                  <Button
                    type="primary"
                    disabled={!storeProgramNomenclature.allowNew}
                    onClick={() => {
                      setNomenclatureProps({
                        ...nomenclatureProps,
                        open: true,
                        program: selectInstituteProgram,
                        id: 'new',
                      });
                    }}
                  >
                    Add Nomenclature
                  </Button>
                </Col>
              </Row>
            )}
          />
        </When>

        <When condition={selectedProgramType === 'department'}>
          <Divider orientation="left">Program Information</Divider>
          <Row justify="end">
            <Col>
              <Button
                type="primary"
                onClick={() => navigateToNewForm('department')}
              >
                Add Program
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Space>
                Department:
                <Select
                  style={{ width: 400 }}
                  value={selectDepartment}
                  options={storeAcademicDepartment.allDepartments}
                  onChange={(value) => setDepartment(value)}
                ></Select>
              </Space>
            </Col>
          </Row>
          <br />
          <Table
            bordered
            columns={columnsDepartment}
            dataSource={storeProgramDetails.allDepartmentRecords}
            scroll={{ x: true }}
          />

          <br />
          <Row>
            <Col>
              <Space>
                Program:
                <Select
                  style={{ width: 400 }}
                  value={selectDepartmentProgram}
                  options={storeProgramDetails.optionsDepartmentPrograms}
                  onChange={(value) => setDepartmentProgram(value)}
                />
              </Space>
            </Col>
          </Row>

          <Divider orientation="left">Intake Information</Divider>
          <Table
            bordered
            columns={intakeColumns}
            dataSource={storeProgramIntake.intakeRecords}
            scroll={{ x: true }}
            title={() => (
              <Row justify="end">
                <Col>
                  <Button
                    type="primary"
                    disabled={!storeProgramIntake.allowNew}
                    onClick={() => {
                      setIntakeProps({
                        ...intakeProps,
                        open: true,
                        program: selectInstituteProgram,
                        id: 'new',
                      });
                    }}
                  >
                    Add Intake
                  </Button>
                </Col>
              </Row>
            )}
          />

          <Divider orientation="left">Nomenclature Information</Divider>
          <Table
            bordered
            columns={nomenclatureColumns}
            dataSource={storeProgramNomenclature.nomenclatureRecords}
            scroll={{ x: true }}
            title={() => (
              <Row justify="end">
                <Col>
                  <Button
                    type="primary"
                    disabled={!storeProgramNomenclature.allowNew}
                    onClick={() => {
                      setNomenclatureProps({
                        ...nomenclatureProps,
                        open: true,
                        program: selectInstituteProgram,
                        id: 'new',
                      });
                    }}
                  >
                    Add Nomenclature
                  </Button>
                </Col>
              </Row>
            )}
          />
        </When>
      </Card>

      <When condition={intakeProps.open === true}>
        {() => (
          <IntakeModal
            {...intakeProps}
            handleOk={intakeOk}
            handleCancel={intakeCancel}
          />
        )}
      </When>
      <When condition={nomenclatureProps.open === true}>
        {() => (
          <NomenclatureModal
            {...nomenclatureProps}
            handleOk={nomenclatureOk}
            handleCancel={nomenclatureCancel}
          />
        )}
      </When>
    </div>
  );
};

export default ProgramDetailsList;
