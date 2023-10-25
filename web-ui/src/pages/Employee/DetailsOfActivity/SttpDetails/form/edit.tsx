import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Modal, Select, DatePicker, Upload, Checkbox, notification, Descriptions } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmptyValue } from '@/utils/object';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeSttpDetails from '@/models/Employee/DetailsOfActivity/SttpDetails/SttpDetails';
import { useEmployeeSttpDetails } from '@/store/employee/DetailsOfActivity/SttpDetails/useEmployeeSttpDetails';
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
const academicYear = todoLookUps.getState().academicYear;
const organisingBody = todoLookUps.getState().organisingBody;
const programs = todoLookUps.getState().program;
const financialSupport = todoLookUps.getState().organisinggencyYesNo;
const relevantPo = todoLookUps.getState().relevantPo;
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import moment from 'moment';
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
const EmployeeSttpDetailsForm = ({
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
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeSttpDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [organizingBody, setOrganizingBody] = useState(false);
  const [organizingInstitute, setOrganizingInstitute] = useState(false);
  const global = useGlobalState((state: any) => state.default);

  const storeSttpDetails = useEmployeeSttpDetails((state: any) => ({
    // allRecords: state.allRecords,
    // getRecords: state.getRecords,
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  const headerLabel = isNew ? 'Add STTP/Workshop/FDTP/FDP/STC Details' : 'Edit STTP/Workshop/FDTP/FDP/STC Details';
  const [addSttp, setaddSttp] = useState([''])


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

  React.useEffect(() => {
    storeSttpDetails.getRecord(id);
    storeAcademicYear.getAcademicYearDetails();
    storeProgramDetails.getRecords();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);


  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const calculatediff = (event: any, id: string) => {
    if (id === 'startDate') {
      setStartDate(event);
      const durationdiff = moment(endDate).diff(moment(event), 'days');
      form.setFieldValue('duration', durationdiff);
    }
    else if (id === 'endDate') {
      setEndDate(event);
      const durationdiff = moment(event).diff(moment(startDate), 'days');
      form.setFieldValue('duration', durationdiff);
    }
  };


  React.useEffect(() => {
    if (storeSttpDetails.current.id !== id) {
      return;
    }
    setStartDate(storeSttpDetails.current.startDate);
    setEndDate(storeSttpDetails.current.endDate);
    if (storeSttpDetails.current.organisingBody === 'other') {
      setOrganizingBody(true)
    }
    if (storeSttpDetails.current.otherOrganisingInstitute === 'other') {
      setOrganizingInstitute(true)
    }
    form.setFieldsValue(storeSttpDetails.current);

  }, [storeSttpDetails.current]);

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

  const doCancel = () => {
    if (_.isFunction(handleCancel)) {
      handleCancel(studentId);
    }
  };

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
    console.log(form.getFieldValue('positionName'));
    if (form.getFieldValue('positionName') === 'ASSISTANT HEAD OF THE DEPARTMENT') {
      setisHODPosition(true)
    } else {
      setisHODPosition(false)

    }
  };
  const onOrganisingBodyChange = () => {
    if (form.getFieldValue('organisingBody') === 'other') {
      setOrganizingBody(true)
    } else {
      setOrganizingBody(false)
    }
  };

  const onOrganisingInstituteChange = () => {
    if (form.getFieldValue('organisingInstitute') === 'other') {
      setOrganizingInstitute(true)
    } else {
      setOrganizingInstitute(false)
    }
  };

  const changePrograms = () => {
    console.log("printchangeprograms", form.getFieldValue("program"))
  }
  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeSttpDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
          }
        }
        else {
          const record = await storeSttpDetails.updateRecord(id, values);
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
              autoComplete="off">
              <When condition={!isNew}>
                <div>
                  <Form.Item name="academicYear" label="Academic Year" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Select onChange={onPositionChange} options={optionsAcademicYear} />
                  </Form.Item>
                  <Form.Item name="programDetails" label="Program/Training Details" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="startDate" label="Start Date" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <DatePicker className="w-100%" format={global.displayDateFormat}
                      value={startDate}
                      onChange={(event: any) => calculatediff(event, 'startDate')} />
                  </Form.Item>
                  <Form.Item name="endDate" label="End Date" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <DatePicker className="w-100%" format={global.displayDateFormat}
                      value={endDate}
                      onChange={(event: any) => calculatediff(event, 'endDate')} />
                  </Form.Item>

                  <Form.Item name="duration" label="Duration (Days)" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Input disabled />
                  </Form.Item>
                  <Form.Item name="location" label="Location" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="organisingBody" label="Organising Body" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Select onChange={onOrganisingBodyChange} options={organisingBody} />
                  </Form.Item>
                  {organizingBody && <Form.Item name="otherOrganisingBody" label="Other" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Input />
                  </Form.Item>
                  }
                  <Form.Item name="organisingInstitute" label="Organising Institute" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Select onChange={onOrganisingInstituteChange} options={organisingBody} />
                  </Form.Item>
                  {organizingInstitute && <Form.Item name="otherOrganisingInstitute" label="Other" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Input />
                  </Form.Item>
                  }
                  <Form.Item name="program" label="Program" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Select onChange={changePrograms} options={optionsPrograms} />
                  </Form.Item>
                  <Form.Item name="relevantPo" label="Relevant PO" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Select onChange={onPositionChange} options={relevantPo} />

                  </Form.Item>
                  <Form.Item name="certificateDocument" label="Upload Document" getValueFromEvent={getFile} style={{ fontWeight: 'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item name="financialSupport" label="Is financial support provided by college?" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Select onChange={onPositionChange} options={financialSupport} />
                  </Form.Item>
                </div>
              </When>

              <When condition={isNew}>
                <Form.Item name="academicYear" label="Academic Year" rules={schemaRules} required style={{ fontWeight: 'bold', marginTop: 20 }}>
                  <Select onChange={onPositionChange} options={optionsAcademicYear} />
                </Form.Item>
                <Form.Item name="programDetails" label="Program/Training Details" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Input />
                </Form.Item>
                <Form.Item name="startDate" label="Start Date" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <DatePicker className="w-100%" format={global.displayDateFormat}
                    value={startDate}
                    onChange={(event: any) => calculatediff(event, 'startDate')} />
                </Form.Item>
                <Form.Item name="endDate" label="End Date" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <DatePicker className="w-100%" format={global.displayDateFormat}
                    value={endDate}
                    onChange={(event: any) => calculatediff(event, 'endDate')} />
                </Form.Item>
                <Form.Item name="duration" label="Duration (Days)" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Input disabled />
                </Form.Item>
                <Form.Item name="location" label="Location" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Input />
                </Form.Item>
                <Form.Item name="organisingBody" label="Organising Body" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Select onChange={onOrganisingBodyChange} options={organisingBody} />
                </Form.Item>
                {organizingBody && <Form.Item name="otherOrganisingBody" label="Other" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Input />
                </Form.Item>
                }
                <Form.Item name="organisingInstitute" label="Organising Institute" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Select onChange={onOrganisingInstituteChange} options={organisingBody} />
                </Form.Item>
                {organizingInstitute && <Form.Item name="otherOrganisingInstitute" label="Other" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Input />
                </Form.Item>
                }
                <Form.Item name="program" label="Program" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Select onChange={changePrograms} options={optionsPrograms} />
                </Form.Item>
                <Form.Item name="relevantPo" label="Relevant PO" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Select onChange={onPositionChange} options={relevantPo} />

                </Form.Item>
                <Form.Item name="certificateDocument" label="Upload Document" getValueFromEvent={getFile} style={{ fontWeight: 'bold' }}>
                  <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item name="financialSupport" label="Is financial support provided by college?" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Select onChange={onPositionChange} options={financialSupport} />
                </Form.Item>

              </When>
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default EmployeeSttpDetailsForm;
