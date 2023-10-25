import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Affix,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
  notification,
} from 'antd';

import { When } from 'react-if';
import moment from 'moment';
import * as modelTermDuration from '@/models/Academics/programManagement/termDuration';
import { useSettings } from '@/store/settings/useSettings';
import { useTermDuration } from '@/store/Academics/programManagement/useTermDuration';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { useProgramDetails } from '@/store/settings/useProgramDetails';

const AcademicDepartmentEdit = () => {
  const { id, className, pattern, year, program } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    allAnnualPatternPrograms: state.allAnnualPatternPrograms,
  }));
  const optionsAcademicYear = storeAcademicYear.comboByName;
  const optionPattern = todoLookUps.getState().examinationPattern;
  const optionsPrograms = storeProgramDetails.allRecords;
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelTermDuration.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const storeTermDuration = useTermDuration((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeTermDuration.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    form.setFieldValue('year', year);
    form.setFieldValue('term', pattern);
    form.setFieldValue('programId', program);
    form.setFieldValue('className', className);
    if (storeTermDuration.current.id !== id) {
      return;
    }
    if (pattern === 'annual') {
      form.setFieldValue('startDate', moment(storeTermDuration.current.semester[0].startDate));
      form.setFieldValue('endDate', moment(storeTermDuration.current.semester[0].endDate));
    }
    else if (pattern === 'semester') {
      form.setFieldValue('startDate1', moment(storeTermDuration.current.semester[0].startDate));
      form.setFieldValue('endDate1', moment(storeTermDuration.current.semester[0].endDate));

      form.setFieldValue('startDate2', moment(storeTermDuration.current.semester[1].startDate));
      form.setFieldValue('endDate2', moment(storeTermDuration.current.semester[1].endDate));
    }
    else if (pattern === 'trimester') {
      form.setFieldValue('startDate1', moment(storeTermDuration.current.semester[0].startDate));
      form.setFieldValue('endDate1', moment(storeTermDuration.current.semester[0].endDate));

      form.setFieldValue('startDate2', moment(storeTermDuration.current.semester[1].startDate));
      form.setFieldValue('endDate2', moment(storeTermDuration.current.semester[1].endDate));

      form.setFieldValue('startDate3', moment(storeTermDuration.current.semester[2].startDate));
      form.setFieldValue('endDate3', moment(storeTermDuration.current.semester[2].endDate));
    }
    form.setFieldsValue(storeTermDuration.current);
  }, [storeTermDuration.current]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeTermDuration.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.programId}`,
            });
          }
        }
        else {
          values.id = id;
          const record = await storeTermDuration.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Updated record for ${record.degreeName}`,
            });
          }
        }
        setSaveProgress({
          saving: false,
          disableSubmit: true,
          disableForm: true,
        });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({
          saving: false,
          disableSubmit: false,
          disableForm: false,
        });
      });
  };

  const headerLabel = isNew ? 'Edit Term Duration' : 'Add Term Duration';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                <Button type="primary" onClick={onFormSubmit}>
                  Submit
                </Button>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item name="year" label="Academic Year">
                <DisplaySelect options={optionsAcademicYear} />
              </Form.Item>
              <Form.Item name="programId" label="Program">
                <DisplaySelect options={optionsAcademicYear} />
              </Form.Item>
              <Form.Item name="className" label="Class">
                <DisplaySelect />
              </Form.Item>
              <Form.Item name="term" label="Examination Pattern">
                <DisplaySelect options={optionPattern} />
              </Form.Item>
              <When condition = {pattern === 'annual'}>
            <Input.Group >
                <Typography.Text strong></Typography.Text>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="startDate" label="Start Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="endDate" label="End Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>

            </When>
            <When condition = {pattern === 'semester'}>
            <Input.Group >
                <Typography.Text strong>Semester 1</Typography.Text>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="startDate1" label="Start Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="endDate1" label="End Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
              <Input.Group >
                <Typography.Text strong>Semester 2</Typography.Text>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="startDate2" label="Start Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="endDate2" label="End Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>

            </When>
            <When condition = {pattern === 'trimester'}>
            <Input.Group >
                <Typography.Text strong>Term 1</Typography.Text>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="startDate1" label="Start Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="endDate1" label="End Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
              <Input.Group >
                <Typography.Text strong>Term 2</Typography.Text>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="startDate2" label="Start Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="endDate2" label="End Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>

              <Input.Group >
                <Typography.Text strong>Term 3</Typography.Text>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="startDate3" label="Start Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="endDate3" label="End Date" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </When>
            </Col>

          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default AcademicDepartmentEdit;
