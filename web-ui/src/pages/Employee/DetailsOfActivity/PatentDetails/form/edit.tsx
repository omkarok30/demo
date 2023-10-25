import React, { useState } from 'react';
import { Button, Affix, Card, Col, Row, Table, Form, Input, Space,Modal, Select, DatePicker, Upload, Checkbox, notification, Descriptions, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmptyValue } from '@/utils/object';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeePatentDetails from '@/models/Employee/DetailsOfActivity/PatentDetails/PatentDetails';
import { useEmployeePatentDetails } from '@/store/employee/DetailsOfActivity/PatentDetails/useEmployeePatentDetails';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { UploadOutlined } from '@ant-design/icons';
import { todoLookUps } from '@/store/todoLookUps';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import { useGlobalState } from '@/store/global';
import { schemaValidator } from '@/utils/validate';
import MainHeader from '@/pages/Employee/MainHeader';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
const employeeApplicationStatus = todoLookUps.getState().employeeApplicationStatus;
import { When } from 'react-if';
import _ from 'lodash';
export interface ActivityModalType {
  id: any;
  studentId: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}
const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeePatentDetailsForm = ({
  id,
  studentId,
  open,
  handleOk,
  handleCancel,
}: ActivityModalType) => {
  const { empId } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [isCurrentlyHoldingThisPosition, setIsCurrentlyHoldingThisPosition] = React.useState(true)
  const [isApplicationStatusGranted, setisApplicationStatusGranted] = React.useState(false)
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeePatentDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const global = useGlobalState((state: any) => state.default);

  const storePatentDetails = useEmployeePatentDetails((state: any) => ({
    // allRecords: state.allRecords,
    // getRecords: state.getRecords,
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  const storeEmployeeDetails = useEmployeeDetails((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  React.useEffect(() => {
    storeEmployeeDetails.getRecord(empId);
    return () => {
      form.setFieldsValue({});
    };
  }, [empId]);

  React.useEffect(() => {
    if (storeEmployeeDetails.current.id !== empId) {
      return;
    }
    //form.setFieldsValue(storeEmployeeDetails.current);
  }, [storeEmployeeDetails.current]);

  const headerLabel = isNew ? 'Add Patent Details' : 'Edit Patent';

  const doCancel = () => {
    if (_.isFunction(handleCancel)) {
      handleCancel(studentId);
    }
  };

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };


  React.useEffect(() => {
    storePatentDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);


  React.useEffect(() => {
    if (storePatentDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storePatentDetails.current);
    if (form.getFieldValue('applicationStatus') === 'granted') {
      setisApplicationStatusGranted(true)
    }
  }, [storePatentDetails.current]);
  const [addPatent, setAddPatent] = useState([''])
  const nvaigateToPreviousPage = () => {
    navigate(`/employee/employee_details/edit/${empId}`, { state: { activeTab: 'details_of_activities' } });
  }
  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      console.log(`checked = ${e.target.checked}`);
      setIsCurrentlyHoldingThisPosition(true)
    } else {
      setIsCurrentlyHoldingThisPosition(false)
      console.log(`checked = ${e.target.checked}`);

    }
  };
  const getFile = (e: UploadFileStatus) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };
  const onPositionChange = () => {
    console.log(form.getFieldValue('applicationStatus'));
    if (form.getFieldValue('applicationStatus') === 'granted') {
      setisApplicationStatusGranted(true)
    } else {
      setisApplicationStatusGranted(false)
    }
  };
  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storePatentDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
          }
        }
        else {
          const record = await storePatentDetails.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.firstName}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
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
          <Row className='justify-center'>
            <Col span={12}>
              <When condition={!isNew}>
                <Form
                  form={form}
                  layout="vertical"
                  autoComplete="off">
                  <Form.Item name="application_no" label="Application No" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="dateOfFilling" label="Date of Filling" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <DatePicker className="w-100%" format={global.displayDateFormat} />
                  </Form.Item>
                  <Form.Item name="applicantName" label="Applicant Name(s)" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="inventionTitle" label="Title of Invention" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="applicationStatus" label="Application Status" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Select onChange={onPositionChange} options={employeeApplicationStatus} />
                  </Form.Item>
                  {isApplicationStatusGranted ?
                    <>
                      <Form.Item name="grantDate" label="Date of Grant" style={{ fontWeight: 'bold' }}>
                        <DatePicker className="w-100%" format={global.displayDateFormat} />
                      </Form.Item>
                    </> : ''}

                  <Form.Item name="considerForAccreditation" label="Consider for Accreditation" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Radio.Group>
                      <Radio value='yes'>Yes</Radio>
                      <Radio value='no'>No</Radio>

                    </Radio.Group>
                  </Form.Item>

                  {/* <Form.Item className='text-center' style={{ fontWeight: 'bold' }}>
                  <Button className='mt-4' type="primary" onClick={onFormSubmit}>
                    Submit
                  </Button>
                  <Button onClick={nvaigateToPreviousPage} className='mt-4 ml-3' >
                    Back
                  </Button>
                </Form.Item> */}
                </Form>
              </When>

              <When condition={isNew}>
                {addPatent.map((item, inde) => {
                  return (
                    <div>
                      {/* <h3 style={{ fontWeight: 'bold',margin:10 }}>Patent {inde + 1}</h3> */}
                      <Form
                        form={form}
                        layout="vertical"
                        autoComplete="off">
                        <Form.Item name="application_no" label="Application No" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                          <Input />
                        </Form.Item>

                        <Form.Item name="dateOfFilling" label="Date of Filling" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                          <DatePicker className="w-100%" format={global.displayDateFormat} />
                        </Form.Item>
                        <Form.Item name="applicantName" label="Applicant Name(s)" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                          <Input />
                        </Form.Item>

                        <Form.Item name="inventionTitle" label="Title of Invention" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                          <Input />
                        </Form.Item>
                        <Form.Item name="applicationStatus" label="Application Status" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                          <Select onChange={onPositionChange} options={employeeApplicationStatus} />
                        </Form.Item>
                        {isApplicationStatusGranted ?
                          <>
                            <Form.Item name="grantDate" label="Date of Grant" style={{ fontWeight: 'bold' }}>
                              <DatePicker className="w-100%" format={global.displayDateFormat} />
                            </Form.Item>
                          </> : ''}

                        <Form.Item name="considerForAccreditation" label="Consider for Accreditation" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                          <Radio.Group>
                            <Radio value='yes'>Yes</Radio>
                            <Radio value='no'>No</Radio>

                          </Radio.Group>
                        </Form.Item>
                        {/* {inde > 0 && <Col style={{ marginLeft: 10, marginBottom: 10 }}>
                        <Button danger type="primary" size='small' style={{ backgroundColor: '#C41016' }}
                          onClick={() => {
                            const newArray = addPatent.filter((i, j) => {
                              return inde !== j
                            })
                            setAddPatent(newArray)
                          }}>Remove</Button>
                      </Col>
                      } */}
                        {/* <Form.Item className='text-center' style={{ fontWeight: 'bold' }}>
                      <Button className='mt-4' type="primary" onClick={onFormSubmit}>
                        Submit
                      </Button>
                      <Button onClick={nvaigateToPreviousPage} className='mt-4 ml-3' >
                        Back
                      </Button>
                    </Form.Item> */}
                      </Form>
                    </div>
                  )
                })}

                {/* {addPatent && <Row style={{ marginBottom: 20 }}>
                <Col>
                  <Button type="primary" size='small' style={{ backgroundColor: '#008000' }}
                    onClick={() => {
                      setAddPatent([...addPatent, ''])
                    }}>Add Patent</Button>
                </Col>
              </Row>
              } */}
              </When>
            </Col>
          </Row>
      </Modal>
    </div>
  );
};

export default EmployeePatentDetailsForm;
