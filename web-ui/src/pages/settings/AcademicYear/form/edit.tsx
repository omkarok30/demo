import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Col, DatePicker, Form, Input, Row, Typography, notification } from 'antd';
import { When } from 'react-if';
import moment from 'moment';

import * as modelAcademicYear from '@/models/settings/AcademicYear';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';

const AcademicYearForm = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const settings = useSettings((state: any) => state.byKeys);
  const global = useGlobalState((state: any) => state.default);

  const levelOfEducation = React.useMemo(() => settings.get('level_of_education') || [], [settings]);
  const schemaRules = React.useMemo(() => schemaValidator(modelAcademicYear.schemaRules, { settings }), [settings]);

  const { academicYearDetail, getAcademicYearDetail, updateRecord } = useAcademicYear(
    (state: any) => ({
      getAcademicYearDetail: state.getAcademicYearDetail,
      academicYearDetail: state.current,
      updateRecord: state.updateRecord,
    }),
  );

  const [form] = Form.useForm();

  React.useEffect(() => {
    getAcademicYearDetail(id);
    return () => {
      // clearAcademicYearDetail();
      form.setFieldsValue(academicYearDetail);
    };
  }, [id]);

  React.useEffect(() => {
    form.setFieldsValue(academicYearDetail);
  }, [academicYearDetail]);

  const onFormSubmit = () => {
    form.validateFields()
      .then((values) => {
        values.id = id;
        updateRecord(id, values);
      })
      .catch(() => {
        notification.error({
          message: 'Validations failed',
        });
      });
  };

  const disabledDate = React.useMemo(() => {
    if (isEmptyValue(academicYearDetail.yearAt)) {
      return null;
    }
    return modelAcademicYear.disabledDate(academicYearDetail.yearAt);
  }, [academicYearDetail?.yearAt]);

  const defaultPickerValue: moment.Moment | null = React.useMemo(() => {
    if (isEmptyValue(academicYearDetail.yearAt)) {
      return null;
    }
    return moment(new Date(academicYearDetail.yearAt, 0));
  }, [academicYearDetail?.yearAt]);

  const headerLabel = isNew ? 'Add Academic Year' : 'Edit Academic Year';

  return (<div className='layout-main-content'>
    <Form form={form} layout="vertical">
      <Card
        bordered={false}
        title={headerLabel}
        actions={[
          <Affix offsetBottom={12}>
            <Form.Item>
              {/* <Button type="primary" htmlType="submit" onSubmit={handleFormSubmit}> */}
              <Button type="primary" onClick={onFormSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Affix>,
        ]}
      >
        <Row className="justify-center">
          <Col className='w-md'>
            <Form.Item name="year" label="Academic Year" rules={schemaRules}>
              <Input disabled />
            </Form.Item>
            {/* <Form.Item name="is_active" label="Is Active" rules={schemaRules}>
              <Input />
            </Form.Item> */}
            {/* <Form.Item name="is_activated" label="Is Activated" rules={schemaRules}>
              <Input />
            </Form.Item> */}
            {/* <Form.Item name="commencement_year" label="Commencement Year" rules={schemaRules}>
              <Input />
            </Form.Item> */}
            <When condition={_.includes(levelOfEducation, 'UG')}>
              <Input.Group >
                <Typography.Text strong>UG</Typography.Text>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="ugFromDate" label="From" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} disabledDate={disabledDate} defaultPickerValue={defaultPickerValue} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="ugToDate" label="To" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} disabledDate={disabledDate} defaultPickerValue={defaultPickerValue} />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </When>
            <When condition={_.includes(levelOfEducation, 'PG')}>
              <Input.Group >
                <Typography.Text strong>PG</Typography.Text>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="pgFromDate" label="From" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} disabledDate={disabledDate} defaultPickerValue={defaultPickerValue} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="pgToDate" label="To" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} disabledDate={disabledDate} defaultPickerValue={defaultPickerValue} />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </When>
            <When condition={_.includes(levelOfEducation, 'PHD')}>
              <Input.Group >
                <Typography.Text strong>PHD</Typography.Text>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="phdFromDate" label="From" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} disabledDate={disabledDate} defaultPickerValue={defaultPickerValue} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="phdToDate" label="From" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} disabledDate={disabledDate} defaultPickerValue={defaultPickerValue} />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </When>
            <When condition={_.includes(levelOfEducation, 'Diploma')}>
              <Input.Group >
                <Typography.Text strong>Diploma</Typography.Text>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="diplomaFromDate" label="From" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} disabledDate={disabledDate} defaultPickerValue={defaultPickerValue} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="diplomaToDate" label="To" rules={schemaRules}>
                      <DatePicker className="w-100%" format={global.displayDateFormat} disabledDate={disabledDate} defaultPickerValue={defaultPickerValue} />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </When>
            {/* <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should confirm updates.')),
                },
              ]}
            >
              <Checkbox>I confirm to add the above record.</Checkbox>
            </Form.Item> */}
            {/* <Form.Item name="assessment_type" label="Assessment Type" rules={schemaRules}>
              <Input />
            </Form.Item>
            <Form.Item name="fy_dept_type" label="FY Department Type" rules={schemaRules}>
              <Input />
            </Form.Item> */}
          </Col>
        </Row>
      </Card>
    </Form>
  </div>);
};

export default AcademicYearForm;
