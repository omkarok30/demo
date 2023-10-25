import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, DatePicker, Modal, Radio, Row, Upload, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import * as modelDevelopmentActivityDetailsList from '@/models/Employee/DetailsOfActivity/DevelopmentActivityDetails/DevelopmentActivityDetails';
import { useSettings } from '@/store/settings/useSettings';
import { useDevelopmentActivityDetailsList } from '@/store/employee/DetailsOfActivity/DevelopmentActivityDetails/useDevelopmentActivityDetails';
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
const participationType = todoLookUps.getState().participationType;
const activity = todoLookUps.getState().activity;
const organisinggencyYesNo = todoLookUps.getState().organisinggencyYesNo;
const productDevelopment = todoLookUps.getState().productDevelopment;
const program = todoLookUps.getState().program;
const relevantPo = todoLookUps.getState().relevantPo;
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';
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
import { useProgramDetails } from '@/store/settings/useProgramDetails';
const DevelopmentActivityDetailsEdit = ({
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
  const schemaRules = React.useMemo(() => schemaValidator(modelDevelopmentActivityDetailsList.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [isCollaboratingAgency, setIsCollaboratingAgency] = useState('');
  const [isProductDevelopment, setIsProductDevelopment] = useState('');
  const renderers = {
    programId: (value: string) => <ProgramAsText value={value} />,

  };
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));


  const optionsAcademicYear = storeAcademicYear.comboByName;

  const storeProgramDetails = useProgramDetails((state: any) => ({
    optionsInstitutePrograms: state.optionsAllPrograms,
    getRecords: state.getRecords,
    allSemesterPatternPrograms: state.allSemesterPatternPrograms,
  }));

  const optionsPrograms = storeProgramDetails.optionsInstitutePrograms;

  console.log("optionsProgramsoptionsPrograms", optionsPrograms)
  const storeDevelopmentActivityDetailsList = useDevelopmentActivityDetailsList(
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

  React.useEffect(() => {
    storeDevelopmentActivityDetailsList.getRecord(id);
    storeEmployee.getRecords(id);
    storeAcademicYear.getAcademicYearDetails();
    storeProgramDetails.getRecords();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  const storeEmployeeInfo = useEmployeeDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsstudents: state.optionsstudents,
  }));

  console.log("printstoreEmployeeInfo", storeEmployeeInfo.optionsstudents)

  React.useEffect(() => {
    if (storeDevelopmentActivityDetailsList.current.id !== id) {
      return;
    }
    if (storeDevelopmentActivityDetailsList.current.developmentType === 'product') {
      setIsProductDevelopment('product')
    }
    form.setFieldsValue(storeDevelopmentActivityDetailsList.current);
  }, [storeDevelopmentActivityDetailsList.current]);

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
          const record = await storeDevelopmentActivityDetailsList.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.productName}` });
          }
        }
        else {
          const record = await storeDevelopmentActivityDetailsList.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.productName}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const headerLabel = isNew ? 'Add Development Activity Details' : 'Update Development Activity Details';

  const getFile = (e: UploadFileStatus) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };
  const handleChange = (value: string) => {
    console.log(`selectedhandleChange ${value}`);
    setIsCollaboratingAgency(value)
  };

  const handleProductDevelopmentChange = (value: string) => {
    //console.log(`handleProductDevelopmentChangeselectedhandleChange ${value}`);
    setIsProductDevelopment(value)
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
                  <Form.Item name="developmentType" label="Development Type" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select Development Type"
                      allowClear
                      onChange={handleProductDevelopmentChange}
                      options={productDevelopment} />
                  </Form.Item>
                  {isProductDevelopment == 'product' || isProductDevelopment == 'SELECT FROM DROPDOWN' ?
                    <><Form.Item name="productName" label="Product" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                      <Input style={{ textTransform: 'uppercase' }} />
                    </Form.Item>
                      <Form.Item rules={schemaRules} name="description" label="Description" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                        <Input.TextArea style={{ textTransform: 'uppercase' }} rows={3} />
                      </Form.Item>
                    </>
                    :
                    <Form.Item rules={schemaRules} name="description" label="Description" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                      <Input.TextArea style={{ textTransform: 'uppercase' }} rows={3} />
                    </Form.Item>
                  }
                  <Form.Item name="additionalInformationDocument" label="Upload additional information" getValueFromEvent={getFile} rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item name="developmentActivityEmployee$empIds" label="Faculty Involved" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select Faculty Involved"
                      allowClear
                      mode="multiple"
                      options={storeEmployee.optionsEmployee} />
                  </Form.Item>
                  <Form.Item name="programId" label="Program" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select Program"
                      allowClear
                      onChange={handleChange}
                      options={optionsPrograms} />
                  </Form.Item>
                  <Form.Item name="relevantPo" label="Relevant PO" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    {/* <Input style={{ textTransform: 'uppercase' }} /> */}
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select PO"
                      allowClear
                      options={relevantPo} />
                  </Form.Item>
                  <Form.Item name="considerForAccreditation" label="Consider for Accreditation?" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Radio.Group>
                      <Radio value='yes'>Yes</Radio>
                      <Radio value='no'>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="otherPeople" label="Other People Involved in Activity" rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
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
                <Form.Item name="developmentType" label="Development Type" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select Development Type"
                    allowClear
                    onChange={handleProductDevelopmentChange}
                    options={productDevelopment} />
                </Form.Item>
                {isProductDevelopment == 'product' || isProductDevelopment == 'SELECT FROM DROPDOWN' ?
                  <><Form.Item name="productName" label="Product" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                    <Form.Item rules={schemaRules} name="description" label="Description" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                      <Input.TextArea style={{ textTransform: 'uppercase' }} rows={3} />
                    </Form.Item>
                  </>
                  :
                  <Form.Item rules={schemaRules} name="description" label="Description" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input.TextArea style={{ textTransform: 'uppercase' }} rows={3} />
                  </Form.Item>
                }
                <Form.Item name="additionalInformationDocument" label="Upload additional information" getValueFromEvent={getFile} rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Upload>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item name="developmentActivityEmployee$empIds" label="Faculty Involved" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select Faculty Involved"
                    allowClear
                    mode="multiple"
                    options={storeEmployee.optionsEmployee} />
                </Form.Item>
                <Form.Item name="programId" label="Program" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select Program"
                    allowClear
                    onChange={handleChange}
                    options={optionsPrograms} />
                </Form.Item>
                <Form.Item name="relevantPo" label="Relevant PO" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  {/* <Input style={{ textTransform: 'uppercase' }} /> */}
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select PO"
                    allowClear
                    options={relevantPo} />
                </Form.Item>
                <Form.Item name="considerForAccreditation" label="Consider for Accreditation?" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Radio.Group>
                    <Radio value='yes'>Yes</Radio>
                    <Radio value='no'>No</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="otherPeople" label="Other People Involved in Activity" rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
              </When>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>);
};

export default DevelopmentActivityDetailsEdit;
