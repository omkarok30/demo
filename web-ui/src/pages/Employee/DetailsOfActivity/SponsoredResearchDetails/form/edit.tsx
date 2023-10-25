import React from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, DatePicker, Radio, Row, Upload, Select, Modal, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import * as modelSponsoredResearchDetailsList from '@/models/Employee/DetailsOfActivity/SponsoredResearchDetails/SponsoredResearchDetails';
import { useSettings } from '@/store/settings/useSettings';
import { useSponsoredResearchDetailsList } from '@/store/employee/DetailsOfActivity/SponsoredResearchDetails/useSponsoredResearchDetails';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
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
const fundingAgencyType = todoLookUps.getState().fundingAgencyType;
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import MainHeader from '@/pages/Employee/MainHeader';
import _ from 'lodash';
export interface ActivityModalType {
  id: any;
  studentId: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}
const EmployeeSponsoredResearchDetailsEdit = ({
  id,
  studentId,
  open,
  handleOk,
  handleCancel,
}: ActivityModalType) => {
  const { empId } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(modelSponsoredResearchDetailsList.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
  };


  const storeSponsoredResearchDetailsList = useSponsoredResearchDetailsList(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const optionsAcademicYear = storeAcademicYear.comboByName;

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  const storeEmployee = useEmployeeDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsEmployee: state.optionsEmployee,
  }));

  React.useEffect(() => {
    storeSponsoredResearchDetailsList.getRecord(id);
    storeAcademicYear.getAcademicYearDetails();
    storeEmployee.getRecords(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);




  React.useEffect(() => {
    if (storeSponsoredResearchDetailsList.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeSponsoredResearchDetailsList.current);
  }, [storeSponsoredResearchDetailsList.current]);

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
          const record = await storeSponsoredResearchDetailsList.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.technology}` });
          }
        }
        else {
          const record = await storeSponsoredResearchDetailsList.updateRecord(id, values);
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

  const headerLabel = isNew ? 'Add Sponsored Research Details' : 'Update Sponsored Research Details';

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
                      placeholder="Select a option and change input text above"
                      allowClear
                      options={optionsAcademicYear} />
                  </Form.Item>
                  <Form.Item name="projectTitle" label="Project Title" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="fundingAgency" label="Funding Agency Details" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item rules={schemaRules} name="fundingAgencyType" label="Funding Agency Type" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select From Drop Down"
                      allowClear
                      options={fundingAgencyType} />
                  </Form.Item>
                  <Form.Item name="nameOfPrincipalInvestigator" label="Name of Principal Investigator" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    {/* <Input style={{ textTransform: 'uppercase' }} /> */}
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select From Drop Down"
                      allowClear
                      options={storeEmployee.optionsEmployee} />
                    {/* <Select options={storeEmployee.optionsEmployee} /> */}
                  </Form.Item>
                  <Form.Item name="sponseredResearchEmployee$empIds" label="Add Co-Investigator/s" style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select From Drop Down"
                      allowClear
                      options={storeEmployee.optionsEmployee} mode="multiple" />
                  </Form.Item>

                  {/* <Form.Item name="sanctionDate" label="Date of Sanction" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                  </Form.Item> */}
                  <Form.Item rules={schemaRules} name="santionedAmount" label="Sanctioned Amount (INR)" style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} type={'number'} />
                  </Form.Item>
                  <Form.Item name="duration" label="Duration (Months)" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} type={'number'} />
                  </Form.Item>
                  <Form.Item name="certificateDocument" label="Upload Document" getValueFromEvent={getFile} rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                  </Form.Item>
                </>)}
              </When>

              <When condition={isNew}>
                <Form.Item name="academicYear" label="Academic Year" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select a option and change input text above"
                    allowClear
                    options={optionsAcademicYear} />
                </Form.Item>
                <Form.Item name="projectTitle" label="Project Title" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item name="fundingAgency" label="Funding Agency Details" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item rules={schemaRules} name="fundingAgencyType" label="Funding Agency Type" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select From Drop Down"
                    allowClear
                    options={fundingAgencyType} />
                </Form.Item>
                <Form.Item name="nameOfPrincipalInvestigator" label="Name of Principal Investigator" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select From Drop Down"
                    allowClear
                    options={storeEmployee.optionsEmployee} />
                </Form.Item>
                <Form.Item name="sponseredResearchEmployee$empIds" label="Co-Investigator1" style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select From Drop Down"
                    allowClear
                    options={storeEmployee.optionsEmployee} mode="multiple" />
                </Form.Item>
                {/* <Form.Item name="sanctionDate" label="Date of Sanction" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                </Form.Item> */}
                <Form.Item rules={schemaRules} name="santionedAmount" label="Sanctioned Amount (INR)" style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} type={'number'} />
                </Form.Item>
                <Form.Item name="duration" label="Duration (Months)" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} type={'number'} />
                </Form.Item>
                <Form.Item name="certificateDocument" label="Upload Document" getValueFromEvent={getFile} rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
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

export default EmployeeSponsoredResearchDetailsEdit;
