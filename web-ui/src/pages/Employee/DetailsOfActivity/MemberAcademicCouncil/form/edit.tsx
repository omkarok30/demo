import React from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, DatePicker, Radio, Row, Modal, Upload, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import * as modelMemberAcademicCouncilList from '@/models/Employee/DetailsOfActivity/MemberAcademicCouncilDetails/MemberAcademicCouncilDetails';
import { useSettings } from '@/store/settings/useSettings';
import { useMemberAcademicCouncilList } from '@/store/employee/DetailsOfActivity/MemberAcademicCouncilDetails/useMemberAcademicCouncil';
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
const degreeLevel = todoLookUps.getState().degreeLevel;
const completionStatus = todoLookUps.getState().completionStatus;
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
const EmployeeMemberAcademicCouncilEdit = ({
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
  const schemaRules = React.useMemo(() => schemaValidator(modelMemberAcademicCouncilList.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
  };


  const storeMemberAcademicCouncilList = useMemberAcademicCouncilList(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeMemberAcademicCouncilList.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  const storeEmployeeInfo = useEmployeeDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsstudents: state.optionsstudents,
  }));
  const optionsStudents = storeEmployeeInfo.optionsstudents.filter((item: any) => item.value !== id);
  React.useEffect(() => {
    if (storeMemberAcademicCouncilList.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeMemberAcademicCouncilList.current);
  }, [storeMemberAcademicCouncilList.current]);

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
          const record = await storeMemberAcademicCouncilList.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.technology}` });
          }
        }
        else {
          const record = await storeMemberAcademicCouncilList.updateRecord(id, values);
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

  const headerLabel = isNew ? 'Add Member Of Academic Council' : 'Update Member Of Academic Council';

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
                  <Form.Item name="nameOfCommittee" label="Name of Committee/Body" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="designation" label="Designation" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="fromDate" label="From Date" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                  </Form.Item>
                  <Form.Item rules={schemaRules} name="toDate" label="To Date" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                  </Form.Item>
                  <Form.Item name="certificateDocument" label="Upload Document" required getValueFromEvent={getFile} rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                  </Form.Item>
                </>)}
              </When>

              <When condition={isNew}>
                <Form.Item name="nameOfCommittee" label="Name of Committee/Body" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item name="designation" label="Designation" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item name="fromDate" label="From Date" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                </Form.Item>
                <Form.Item rules={schemaRules} name="toDate" label="To Date" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                </Form.Item>
                <Form.Item name="certificateDocument" label="Upload Document" required getValueFromEvent={getFile} rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
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

export default EmployeeMemberAcademicCouncilEdit;
