import React, { useState } from 'react';
import _ from 'lodash';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  notification,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import * as modelToolAttainment from '@/models/Academics/courseEvaluationTools/ToolAttainment';
import { useToolAttainment } from '@/store/Academics/courseEvaluationTools/useToolAttainment';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { useToolsRepository } from '@/store/Academics/courseEvaluationTools/useToolsRepository';
import { useSettings } from '@/store/settings/useSettings';
import { isEmptyValue } from '@/utils/object';
import { attachRenderer } from '@/utils/tableExtras';
import { ToolTypeAsText } from '@/components/Lookups/renderers/ToolTypeAsText';
import { ToolAssessmentAsText } from '@/components/Lookups/renderers/ToolAssessmentAsText';
import { ToolDependencyAsText } from '@/components/Lookups/renderers/ToolDependencyAsText';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { EditIcon } from '@/components/Icons/EditIcon';

const renderers = {
  tools_repository$toolType: (value: string) => (
    <ToolTypeAsText value={value} />
  ),
  tools_repository$toolDependency: (value: string) => (
    <ToolDependencyAsText value={value} />
  ),
  tools_repository$toolAssessment: (value: string) => (
    <ToolAssessmentAsText value={value} />
  ),
};

const ToolAttainmentList = () => {
  const navigate = useNavigate();

  const storeToolAttainment = useToolAttainment((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    updateCommonAttainment: state.updateCommonAttainment,
  }));

  type LayoutType = Parameters<typeof Form>[0]['layout'];

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  const formItemLayout
    = formLayout === 'horizontal'
      ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 40 },
      }
      : null;
  const buttonItemLayout
    = formLayout === 'horizontal'
      ? {
        wrapperCol: { span: 30, offset: 4 },
      }
      : null;
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
  // export const YearAsText = (props) => {
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const storeAcademicTools = useToolsRepository((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    optionsAllPrograms: state.optionsAllPrograms,
    getRecords: state.getRecords,
  }));
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const optionsAcademicYear = storeAcademicYear.comboByName;
  const optionsPrograms = storeProgramDetails.optionsAllPrograms;
  const navigateToNewAssignForm = () => {
    navigate('../add');
  };
  const Assign = ({ action, record }) => {
    if (action === 'add') {
      // getAcademicYearDetail(record?.id);
      navigate(`../add/${record?.id}`, { state: { id: record?.id } });
    }
  };

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };
  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      // getAcademicYearDetail(record?.id);
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeAcademicYear.getAcademicYearDetails();
    storeProgramDetails.getRecords();
  }, [fetchSettings]);
  const [selectYear, setYear] = useState();
  const [academicYearLabel, setacademicYearLabel] = useState();
  const [selectProgram, setprogram] = useState();
  const [programLabel, setprogramLabel] = useState();
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
    /* if (isEmptyValue(selectYear)) {
      return;
    } */

    storeToolAttainment.getRecords(selectYear, selectProgram);
    storeAcademicTools.getRecords();
  }, [selectYear]);
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

  const [toolAttainmentRecord, setToolAttainmentRecord] = React.useState([]);
  React.useEffect(() => {
    if (isEmptyValue(selectYear) || isEmptyValue(selectProgram)) {
      setToolAttainmentRecord([]);
      return;
    }
    storeToolAttainment.getRecords(selectYear, selectProgram);
    setToolAttainmentRecord(storeToolAttainment.allRecords);
  }, [selectYear, selectProgram]);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelToolAttainment.columns(settings);
    cols.splice(3, 0, {
      title: 'Tool Assessment Method',
      key: 'tools_repository$toolAssessment',
      render: (_, record) => [
        <span>
          {`${record.tools_repository$toolDependency}` === 'dependent'
            ? (
            `${record.tools_repository$dependentToolIds}`
          )
            : (
            <ToolAssessmentAsText value={record.toolAssessment} />
          )}
        </span>,
      ],
    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          <EditIcon></EditIcon>
        </Button>,
      ],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  const [openmodal, setopenmodal] = React.useState(false);
  const showModal = () => {
    setopenmodal(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        storeToolAttainment.updateCommonAttainment(
          selectYear,
          selectProgram,
          values,
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
  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Tool Attainment Level">
        <Row justify="start" key="toolAttainmentlevel-header">
          <Col>
            <Button type="primary" onClick={navigateToNewAssignForm} style={{ borderRadius: '5px' }}>
              Assign Tools
            </Button>
          </Col>
          <Divider orientation="left" plain></Divider>

          <Form form={form} layout="horizontal">
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Academic Year">
                  <Select
                    style={{ width: '150px' }}
                    value={selectYear}
                    options={optionsAcademicYear}
                    onChange={event => setAcademicYear(event)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Program">
                  <Select
                    style={{ width: '300px' }}
                    value={selectProgram}
                    options={storeProgramDetails.optionsAllPrograms}
                    onChange={event => setPrograms(event)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Row></Row>
        </Row>
        <Divider></Divider>

        <Row justify="end">
          <Button type="primary" onClick={showModal} style={{ borderRadius: '5px' }}>
            Common Attainment Level
          </Button>
        </Row>

        <Modal
          title="Confirmation To Submit Common Attainment Level"
          open={openmodal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">

            <label><b>Academic Year: {academicYearLabel}</b></label>

            <br></br>
            <label>
              <b>Program: {programLabel}</b>
            </label>
            <br></br>
            <Divider></Divider>
            <Row>
              <Col span={7}>
                <b>
                  <Form.Item label="Attainment Level* (Percentage of students scoring Marks more than Target Marks)" name="layout"></Form.Item>
                </b></Col>
              <Col span={5}>
                <Form.Item name="targetPer1"
                  label="Level 1"
                  rules={schemaRules}>
                  <Input placeholder="" required />
                </Form.Item>
                <Form.Item name="targetPer2"
                  label="Level 2"
                  rules={schemaRules}>
                  <Input placeholder="" required />
                </Form.Item>
                <Form.Item name="targetPer3"
                  label="Level 3"
                  rules={schemaRules}>
                  <Input placeholder="" required />
                </Form.Item>
              </Col>

            </Row>
            <Form.Item label="Academic Year" style={{ display: 'none' }} name="academicYear">
              <Input value={selectYear} />
            </Form.Item>
            <Form.Item
              label="Program"
              style={{ display: 'none' }}
              name="program"
            >
              <Input value={selectProgram} />
            </Form.Item>
            <Form.Item label="" name="confirmcheckbox"  rules={schemaRules} >
              <Checkbox /> I confirm to assign above Common Attainment Levels to
              all the tools of the selected academic year.
            </Form.Item>
            <Form.Item {...buttonItemLayout}></Form.Item>
          </Form>
        </Modal>
        <div style={{ marginTop: '10px' }}>
        <Table bordered columns={columns} dataSource={toolAttainmentRecord} />

        </div>
      </Card>
    </div>
  );
};

export default ToolAttainmentList;
