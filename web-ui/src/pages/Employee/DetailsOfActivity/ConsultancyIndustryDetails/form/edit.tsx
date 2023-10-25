import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, DatePicker, Radio, Modal, Row, Upload, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import * as modelConsultancyIndustryDetailsList from '@/models/Employee/DetailsOfActivity/ConsultancyIndustryDetails/ConsultancyIndustryDetails';
import { useSettings } from '@/store/settings/useSettings';
import { useConsultancyIndustryDetailsList } from '@/store/employee/DetailsOfActivity/ConsultancyIndustryDetails/useConsultancyIndustryDetails';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
const yesNo = todoLookUps.getState().yesNo;
const gender = todoLookUps.getState().gender;
const salutation = todoLookUps.getState().salutation;
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
const levelOfEducation = todoLookUps.getState().levelOfEducation;
const graduationYear = todoLookUps.getState().graduationYear;
const level = todoLookUps.getState().level;
const academicYear = todoLookUps.getState().academicYear;
const qualityPaper = todoLookUps.getState().qualityPaper;
const levelOfConference = todoLookUps.getState().levelOfConference;
import { UploadFileStatus } from 'antd/lib/upload/interface';
import MainHeader from '@/pages/Employee/MainHeader';
import type { RadioChangeEvent } from 'antd';
import _ from 'lodash';
export interface ActivityModalType {
  id: any;
  studentId: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}
const EmployeeConsultancyIndustryDetailsEdit = ({
  id,
  studentId,
  open,
  handleOk,
  handleCancel,
}: ActivityModalType) => {
  const { empId } = useParams();
  const isNew = id === 'new';
  const [complitionOfAssignmentValue, setComplitionOfAssignmentValue] = useState(false);
  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(modelConsultancyIndustryDetailsList.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
  };


  const storeConsultancyIndustryDetailsList = useConsultancyIndustryDetailsList(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  const storeEmployee = useEmployeeDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsEmployee: state.optionsEmployee,
  }));

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const optionsAcademicYear = storeAcademicYear.comboByName;

  React.useEffect(() => {
    storeConsultancyIndustryDetailsList.getRecord(id);
    storeAcademicYear.getAcademicYearDetails();
    storeEmployee.getRecords(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);


  React.useEffect(() => {
    if (storeConsultancyIndustryDetailsList.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeConsultancyIndustryDetailsList.current);
  

  }, [storeConsultancyIndustryDetailsList.current]);

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio1 checked', value);
    setComplitionOfAssignmentValue(value);
  };

  const doCancel = () => {
    if (_.isFunction(handleCancel)) {
      handleCancel(studentId);
    }
  };

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeConsultancyIndustryDetailsList.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.technology}` });
          }
        }
        else {
          const record = await storeConsultancyIndustryDetailsList.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.technology}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const headerLabel = isNew ? 'Consultancy From Industry' : 'Update Consultancy From Industry';

  const getFile = (e: UploadFileStatus) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };
  return (
    <div className='layout-main-content'>
      <Modal
        title={headerLabel}
        open={open}
        onOk={onFormSubmit}
        onCancel={doCancel}
        closable
        width={1000}
        centered
        style={{ marginTop: 20, marginBottom: 20 }}>
        <MainHeader />
        <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
          <Row className="justify-center">
            <Col className='w-md'>
              <When condition={!isNew}>
                {() => (<>
                  <Form.Item name="academicYear" label="Academic Year" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select Academic Year"
                      allowClear
                      options={optionsAcademicYear} />
                  </Form.Item>
                  <Form.Item name="projectTitle" label="Project Title" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="fundingAgency" label="Funding Agency/Type of Agency" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item rules={schemaRules} name="consultacnyDetailsEmployee$empIds" label="Faculty Involved" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select a option and change input text above"
                      allowClear
                      options={storeEmployee.optionsEmployee} mode="multiple" />
                  </Form.Item>
                  <Form.Item name="amount" label="Amount (INR)" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} type={'number'} />
                  </Form.Item>
                  <Form.Item name="duration" label="Duration (Months)" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    {/* <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} /> */}
                    <Input style={{ textTransform: 'uppercase' }} type={'number'} />
                  </Form.Item>
                  <Form.Item name="complitionOfAssignment" label="Completion of Consultancy Assignment?" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    {/* <Radio.Group options={yesNo} /> */}
                    <Radio.Group>
                      <Radio value='yes'>Yes</Radio>
                      <Radio value='no'>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="considerForAccreditation" label="Consider for Accreditation?" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Radio.Group>
                      <Radio value='yes'>Yes</Radio>
                      <Radio value='no'>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="consultancyDocument" label="Document" getValueFromEvent={getFile} rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                  </Form.Item>
                </>)}
              </When>

              <When condition={isNew}>
                <Form.Item name="academicYear" label="Academic Year" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select Academic Year"
                    allowClear
                    options={optionsAcademicYear} />
                </Form.Item>
                <Form.Item name="projectTitle" label="Project Title" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item name="fundingAgency" label="Funding Agency/Type of Agency" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item rules={schemaRules} name="consultacnyDetailsEmployee$empIds" label="Faculty Involved" style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select a option and change input text above"
                    allowClear
                    options={storeEmployee.optionsEmployee} mode="multiple" />
                </Form.Item>
                <Form.Item name="amount" label="Amount (INR)" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} type={'number'} />
                </Form.Item>
                <Form.Item name="duration" label="Duration (Months)" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  {/* <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} /> */}
                  <Input style={{ textTransform: 'uppercase' }} type={'number'} />
                </Form.Item>
                <Form.Item name="complitionOfAssignment" label="Completion of Consultancy Assignment?" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  {/* <Radio.Group options={yesNo} /> */}
                  {/* <Radio.Group onChange={onChange1} value={complitionOfAssignmentValue}> */}
                  <Radio.Group>
                    <Radio value='yes'>Yes</Radio>
                    <Radio value='no'>No</Radio>
                  </Radio.Group>

                  {/* <Radio.Group options={yesNo} onChange={onChange1} value={complitionOfAssignmentValue} /> */}
                </Form.Item>
                <Form.Item name="considerForAccreditation" label="Consider for Accreditation?" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Radio.Group>
                    <Radio value='yes'>Yes</Radio>
                    <Radio value='no'>No</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="consultancyDocument" label="Upload Document" getValueFromEvent={getFile} rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Upload>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </When>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>);
};

export default EmployeeConsultancyIndustryDetailsEdit;
