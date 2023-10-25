import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Affix,
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  notification,
  Input,
  Modal,
} from 'antd';

import _ from 'lodash';
import * as modelToolAttainment from '@/models/Academics/courseEvaluationTools/ToolAttainment';
import { useSettings } from '@/store/settings/useSettings';
import { useToolAttainment } from '@/store/Academics/courseEvaluationTools/useToolAttainment';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { useToolsRepository } from '@/store/Academics/courseEvaluationTools/useToolsRepository';

const ToolAttainmentEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelToolAttainment.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const optionsAcademicYear = storeAcademicYear.comboByName;

  const storeToolAttainment = useToolAttainment((state: any) => ({
    getRecords: state.getRecords,
    current: state.current,
    updateRecord: state.updateRecord,
    allRecords: state.allRecords,
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    optionsInstitutePrograms: state.optionsInstitutePrograms,
    getRecords: state.getRecords,
  }));
  const optionsPrograms = storeProgramDetails.optionsInstitutePrograms;
  const storeAcademicTools = useToolsRepository((state: any) => ({
    comboByName: state.comboByName,
    getRecords: state.getRecords,
  }));
  const [form] = Form.useForm();
  const optionsTool = storeAcademicTools.comboByName;
  const assignedTools = _.map(storeToolAttainment.allRecords, record => ({
    value: record.id,
  }));
  const getTools = () => {
    let newoptions = [{}];
    if (assignedTools.length !== 0) {
      assignedTools?.map((assigneditem: any) => {
        newoptions = optionsTool?.filter(
          item => item.value !== assigneditem.value,
        );
      });
    }
    else {
      newoptions = optionsTool;
    }
    return newoptions;
  };
  const optionsTools = getTools();

  React.useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
    storeProgramDetails.getRecords();
    storeAcademicTools.getRecords();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);
  const [selectYear, setYear] = useState();
  const [selectProgram, setProgram] = useState();
  const [academicYearLabel, setacademicYearLabel] = useState();
  const [programLabel, setprogramLabel] = useState();
  const handleActionChange = (event: any, id: any) => {
    if (id === 'year') {
      setYear(event);
      storeToolAttainment.getRecords(event, selectProgram);
      const value = event;
      const yearOptions = _.find(optionsAcademicYear, { value });
      const label = _.get(yearOptions, ['label'], '');
      setacademicYearLabel(label);
    }
    else if (id === 'program') {
      setProgram(event);
      storeToolAttainment.getRecords(selectYear, event);
      const value = event;
      const programOptions = _.find(optionsPrograms, { value });
      const label = _.get(programOptions, ['label'], '');
      setprogramLabel(label);
    }
    getTools();
  };
  const onFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        values.id = id;
        storeToolAttainment.updateRecord(id, values);
      })
      .catch(() => {
        notification.error({
          message: 'Validations failed',
        });
      });
  };
  const [openmodal, setopenmodal] = React.useState(false);
  const showModal = () => {
    setopenmodal(true);
  };

  const handleOk = () => {
    setopenmodal(false);
  };

  const handleCancel = () => {
    setopenmodal(false);
  };

  const [selectAcademicyear, setAcademicyear] = React.useState('');

  // const [selectAcreate, setCreatetool] = React.useState('');

  const headerLabel = isNew ? 'Edit Tool Attainment' : 'Assign Tools';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                <Button type="primary" onClick={onFormSubmit} style= {{marginRight:'5px'}}>
                  Submit
                </Button>
                {   }
                <Button type="primary" onClick={showModal}>
                  Clone Information
                </Button>
              </Form.Item>
              <Form.Item>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item
                name="academicYear"
                label="Academic Year"
                required={true}
                rules={schemaRules}
              >
                <Select
                  options={optionsAcademicYear}
                  onChange={(event) => {
                    handleActionChange(event, 'year');
                  }}
                />
              </Form.Item>
              <Form.Item
                name="programId"
                label="Program"
                required={true}
                rules={schemaRules}
              >
                <Select
                  options={optionsPrograms}
                  onChange={(event) => {
                    handleActionChange(event, 'program');
                  }}
                />
              </Form.Item>
              <Form.Item
                name="toolId"
                label="Select Tools"
                required={true}
              >
                <Select options={optionsTools} mode="multiple" ></Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
      <Modal
        title="Confirmation To Submit Common Attainment Level"
        open={openmodal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">

          <label><b>Academic Year: {academicYearLabel}</b></label>

          <br></br>
          <label><b>Program: {programLabel}</b></label>

          <Form.Item
            name="cloneYear"
            label="Clone Year"
            required={true}
          >
            <Select
              options={optionsAcademicYear?.filter(item => item.value !== selectYear)}
              onChange={(event) => {
                handleActionChange(event, 'year');
              }}
            />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default ToolAttainmentEdit;
