import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, Select, Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import TableContainer from '@/components/Table';
import * as programColoumns from '@/models/settings/ProgramDetails';
import * as programIntakeDetails from '@/models/settings/ProgramIntakeDetails';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import _ from 'lodash';
import { useProgramIntakeDetails } from '@/store/settings/useProgramIntakeDetails';
import { useNavigate } from 'react-router-dom';
import AddIntake from '../form/addIntake';
import { useSettings } from '@/store/settings/useSettings';

const unistudinsurance = () => {
  const navigate = useNavigate();
  const settings = useSettings((state: any) => state.byKeys);
  const [selectedProgramType, setSelectedProgramType] = useState('department');
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [selectedProgram, setSelectedProgram] = useState('Diploma in Computer Engineering');
  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const {
    allRecords,
    getRecords
  } = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    allInstituteRecords: state.allInstituteRecords,
    allDepartmentRecords: state.allDepartmentRecords,
    optionsInstitutePrograms: state.optionsInstitutePrograms,
    optionsDepartmentPrograms: state.optionsDepartmentPrograms,
    getRecords: state.getRecords
  }));

  const {
    allRecords: allProgramIntakeDetails,
    getAllRecords: getProgramIntakeRecords
  } = useProgramIntakeDetails((state: any) => ({
    allRecords: state.allRecords,
    allInstRecords: state.allInstRecords,
    allowNew: state.allowNew,
    getAllRecords: state.getAllRecords
  }));

  const handleActionClick = (record: any) => {
    navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
  };

  const programTypes: any[] = [];
  const programs: any[] = [];
  const allProgramTypes = _.uniq(_.map(allRecords.map((item: any) => item.programType)));
  const allPrograms = _.uniq(_.map(allRecords.map((item: any) => item.programmeName)));

  allProgramTypes.map((item: any) => {
    const program = {
      value: item,
      label: item === 'department' ? 'Department Level Program' : 'Institute Level Program',
    };
    programTypes.push(program);
  });

  allPrograms.map((item: any) => {
    const program = {
      value: item,
      label: item,
    };
    programs.push(program);
  });

  React.useEffect(() => {
    getRecords();
    getProgramIntakeRecords();
  }, [
    getRecords,
    getProgramIntakeRecords
  ]);

  const onOptionChange = (event: any) => {
    setSelectedProgramType(event);
  };

  const onChangeProgram = (event: any) => {
    setSelectedProgram(event);
  };

  const program = allRecords.find((item: any) => item.programmeName === selectedProgram);

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Program"
      >
        <Row>
          <Col>
            <Form>
              <Form.Item name="program_types" label="Programs">
                <Select defaultValue={selectedProgramType} style={{ width: '100%' }} id="program_types" options={programTypes} onChange={event => onOptionChange(event)}></Select>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row key="misc-charges" justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Program
            </Button>
          </Col>
        </Row>
        <TableContainer
          data={allRecords.filter((item: any) => item.programType === selectedProgramType)}
          columns={programColoumns.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
        <Row>
          <Col>
            <Form>
              <Form.Item name="programs" label="Program">
                <Select defaultValue={selectedProgram} style={{ width: '100%' }} id="programs" options={programs} onChange={event => onChangeProgram(event)}></Select>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row key="misc-charges" justify="end">
          <Col>
            <Button type="primary" onClick={() => {
              setShowIntakeModal(true);
            }}>
              Add Intake
            </Button>
          </Col>
        </Row>
        <TableContainer
          data={allProgramIntakeDetails.filter((item: any) => item.programmeId === program.id)}
          columns={programIntakeDetails.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
      </Card>
      <Modal title="Add Intake Information" open={showIntakeModal} footer={null} onOk={() => {
        setShowIntakeModal(false);
      }} onCancel={() => {
        setShowIntakeModal(false);
      }}>
        <AddIntake />
      </Modal>
    </div>
  );
};
export default unistudinsurance;
