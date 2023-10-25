import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, Modal } from 'antd';
import { useNavigate,useParams } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeQualificationDetails from '@/models/Employee/EmployeeQualification';
import { useEmployeeQualificationDetails } from '@/store/employee/useEmployeeQualificationDetails';

import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { todoLookUps } from '@/store/todoLookUps';
import { schemaValidator } from '@/utils/validate';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
const levelOfEducation = todoLookUps.getState().levelOfEducation;
const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const QualificationDetailsList = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { empId } = props;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const [clickAddQualification, setClickAddQualification] = useState(false);
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeEmployeeQualificationDetails = useEmployeeQualificationDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeQualificationDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);


  // const navigateToNewForm = () => {
  //    navigate(`/Employee/employee_qualification/edit/${record?.id}`, { state: { id: record?.id } });
  // };

  const storeEmployeeDetails = useEmployeeDetails((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));


  // React.useEffect(() => {
  //   storeEmployeeDetails.getRecord(empId);
  //   return () => {
  //     form.setFieldsValue({});
  //   };
  // }, [empId]);

  // React.useEffect(() => {
  //   if (storeEmployeeDetails.current.id !== empId) {
  //     return;
  //   }
  //   form.setFieldsValue(storeEmployeeDetails.current);
  // }, [storeEmployeeDetails.current]);


  const navigateToNewForm = ({ action, record }) => {

    navigate(`/Employee/employee_add_qualification/edit/${empId}/${record?.id}`, { state: { id: record?.id } });

  };

  const handleActionClick1 = () => {
    const id = storeEmployeeQualificationDetails.allRecords.id;
    //navigate(`/Employee/employee_add_qualification/${id}`, { state: { id } });
    //navigate(`/Employee/employee_qualification/add_qualification`)
    //const id = storeEmployeeQualificationDetails.allRecords.id;
    navigate(`../add_qualification/1`, { state: { id } });
  };

  React.useEffect(() => {
    fetchSettings();
    storeEmployeeQualificationDetails.getRecords();
  }, []);

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };



  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelEmployeeQualificationDetails.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        // <Row>
        //   <Col>
        //     <Button type="link" style={{ backgroundColor: '#2063B0', color: 'white' }} onClick={() => handleActionClick({ action: 'edit', record })}>Update</Button>,
        //     <Button type="link" style={{ backgroundColor: '#2063B0', color: 'white' }} onClick={() => handleActionClick({ action: 'edit', record })}>Delete</Button>
        //   </Col>
        // </Row>

        <Row>
          <Col span={16}>
            <Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}>
              Update
            </Button>
          </Col>
          <Col span={16}>
            <Button type="link" onClick={() => {
              setOpen(true)
            }}>
              Delete
            </Button>
          </Col>
        </Row>

      ],
    });
    //cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);
  // const handleActionClick = () => {
  //   const id = storeEmployeeQualificationDetails.allRecords.id;
  //   navigate(`../edit/${id}`, { state: { id } });
  // };

  // const handleActionClick = ({ action, record }) => {
  //   if (action === 'edit') {
  //     navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
  //   }
  // };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_qualification/edit/${empId}/${record?.id}`, { state: { id: record?.id } });
    }
  };
  const navigateToNewForm1 = () => {
    //navigate('../edit/new');
    navigate(`/Employee/employee_qualification/edit/${id}/new`);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <div className='layout-main-content'>
      <Form>

        {open && <Modal style={{ justifyContent: 'center', alignItems: 'center' }} centered
          title="CONFIRMATION"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}>
          <p>Do you wish to continue this transaction?</p>
        </Modal>
        }
        <Row justify="end">
          <Col>
            <Button type="primary"
              // onClick={() => handleActionClick1}
              onClick={navigateToNewForm1}
            >Add Qualification</Button>
          </Col>
        </Row>
        <Card bordered={false}>
          <Row>
            <Col span={24}>
              <Table bordered scroll={{ x: 350 }} columns={columns} dataSource={storeEmployeeQualificationDetails.allRecords} />
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default QualificationDetailsList;
