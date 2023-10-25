import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Modal, Space, Select, DatePicker, Upload, Checkbox, notification, Descriptions, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmptyValue } from '@/utils/object';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeBookDetails from '@/models/Employee/DetailsOfActivity/BookDetails/BookDetails';
import { useEmployeeBookDetails } from '@/store/employee/DetailsOfActivity/BookDetails/useEmployeeBookDetails';
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
import { When } from 'react-if';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
const yearOfPublication = todoLookUps.getState().academicYear;
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
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
const EmployeeBookDetailsForm = ({
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
  const [isHODPosition, setisHODPosition] = React.useState(false)
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeBookDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [addBook, setBook] = useState([''])
  const global = useGlobalState((state: any) => state.default);

  const storeBookDetails = useEmployeeBookDetails((state: any) => ({
    // allRecords: state.allRecords,
    // getRecords: state.getRecords,
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));


  const optionsAcademicYear = storeAcademicYear.comboByName;

  const headerLabel = isNew ? 'Add Book Detail' : 'Edit Book Details';


  const navigateToNewForm = () => {
    navigate('../edit/new');
  };


  React.useEffect(() => {
    storeBookDetails.getRecord(id);
    storeAcademicYear.getAcademicYearDetails();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);
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

  React.useEffect(() => {
    if (storeBookDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeBookDetails.current);
  }, [storeBookDetails.current]);

  const nvaigateToPreviousPage = () => {
    navigate(`/employee/employee_details/edit/${empId}`, { state: { activeTab: 'details_of_activities' } });
  }

  const doCancel = () => {
    if (_.isFunction(handleCancel)) {
      handleCancel(studentId);
    }
  };

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
  const handleChange = (value: string) => {
    console.log(`bookselectedvaluevalue ${value}`);
    //setEducationLevel(value)
  };
  const onPositionChange = () => {
    console.log("printhello", "Hello")
    console.log(form.getFieldValue('positionName'));
    if (form.getFieldValue('positionName') === 'ASSISTANT HEAD OF THE DEPARTMENT') {
      setisHODPosition(true)
    } else {
      setisHODPosition(false)

    }
  };
  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeBookDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
          }
        }
        else {
          const record = await storeBookDetails.updateRecord(id, values);
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
              <Form
                form={form}
                layout="vertical"
                autoComplete="off" >
                <When condition={!isNew}>
                  <div>
                    <Form.Item name="authorName" label="Author(s)" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                      <Input />
                    </Form.Item>
                    <Form.Item name="bookName" label="Title of Book" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                      <Input />
                    </Form.Item>
                    <Form.Item name="isbn" label="ISBN Number" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                      <Input />
                    </Form.Item>
                    <Form.Item name="publicationYear" label="Year of Publication" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                      <Select onChange={handleChange} options={optionsAcademicYear} />
                    </Form.Item>
                    <Form.Item name="onlineLink" label="Online Link" style={{ fontWeight: 'bold' }}>
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Consider for Accreditation?"
                      name="considerForAccreditation" style={{ fontWeight: 'bold' }}
                      rules={[{ required: true, message: "Please select an option!" }]}
                    >
                      <Radio.Group>
                        <Radio value='yes'>Yes</Radio>
                        <Radio value='no'>No</Radio>

                      </Radio.Group>
                    </Form.Item>
                    <Form.Item name="nameOfPublisher" label="Name of Publisher" style={{ fontWeight: 'bold' }}>
                      <Input />
                    </Form.Item>
                  </div>
                </When>

                <When condition={isNew}>
                        <Form.Item name="authorName" label="Author(s)" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                          <Input />
                        </Form.Item>
                        <Form.Item name="bookName" label="Title of Book" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                          <Input />
                        </Form.Item>
                        <Form.Item name="isbn" label="ISBN Number" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                          <Input />
                        </Form.Item>
                        <Form.Item name="publicationYear" label="Year of Publication" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                          <Select onChange={onPositionChange} options={optionsAcademicYear} />
                        </Form.Item>
                        <Form.Item name="onlineLink" label="Online Link" style={{ fontWeight: 'bold' }}>
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Consider for Accreditation?"
                          name="considerForAccreditation" style={{ fontWeight: 'bold' }}
                          rules={[{ required: true, message: "Please select an option!" }]}
                        >
                          <Radio.Group>
                            <Radio value='yes'>Yes</Radio>
                            <Radio value='no'>No</Radio>

                          </Radio.Group>
                        </Form.Item>
                        <Form.Item name="nameOfPublisher" label="Name of Publisher" style={{ fontWeight: 'bold' }}>
                          <Input />
                        </Form.Item>
                </When>
                </Form>
            </Col>
          </Row>
        
      </Modal>
    </div>
  );
};

export default EmployeeBookDetailsForm;
