import React from 'react';
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
} from 'antd';
import { useAddEmployee } from '@/store/employee/useAddEmployee';
import * as modelEmployeeRecord from '@/models/Employee/EmployeeDetails';
import { schemaValidator } from '@/utils/validate';
import { useSettings } from '@/store/settings/useSettings';
import { useGlobalState } from '@/store/global';
import { todoLookUps } from '@/store/todoLookUps';
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';
import { useNonAcademicDepartment } from '@/store/settings/useNonAcademicDepartment';
import { isEmptyValue } from '@/utils/object';

const CreateEmployeeForm = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const storeDepartmentDetails = useAcademicDepartment((state: any) => ({
    getRecords: state.asDepartmentOptions,
    allDepartments: state.allAcademicDepartments,
  }));
  const storeNonAcademicDepartmentDetails = useNonAcademicDepartment(
    (state: any) => ({
      getRecords: state.asDepartmentOptions,
      allDepartments: state.comboByName,
    }),
  );
  const [departments, setdepartment] = React.useState([{}]);
  React.useEffect(() => {
    storeDepartmentDetails.getRecords();
    storeNonAcademicDepartmentDetails.getRecords();
    const optionsDepartmentId = storeDepartmentDetails.allDepartments;
    const nonAcademicDepartment
      = storeNonAcademicDepartmentDetails.allDepartments;
    if (!isEmptyValue(nonAcademicDepartment)) {
      const deptarray = optionsDepartmentId.concat(nonAcademicDepartment);
      setdepartment(deptarray);
    }
    else {
      const deptarray = optionsDepartmentId;
      setdepartment(deptarray);
    }
  }, []);

  const optionsemployeeType = todoLookUps.getState().employeeType;
  const optionsdesignation = todoLookUps.getState().designation;
  const optionsappointmentType = todoLookUps.getState().appointmentType;
  const optionsappointmentSubtype = todoLookUps.getState().appointmentSubtype;

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelEmployeeRecord.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const storeCreateEmployee = useAddEmployee((state: any) => ({
    addRecord: state.addRecord,
  }));

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        await storeCreateEmployee.addRecord(values);
      })
      .catch((e) => {
        console.log('error', e);
      });
  };
  const handleActionChange = (event) => {};
  const headerLabel = 'Add Employee';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
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
              <Form.Item
                name="departmentId"
                label="Department"
                rules={schemaRules}
                required
              >
                <Select options={departments} onChange={handleActionChange} />
              </Form.Item>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="middleName"
                label="Middle Name"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="employeeType"
                label="Employee Type"
                rules={schemaRules}
                required
              >
                <Select options={optionsemployeeType} />
              </Form.Item>
              <Form.Item
                name="designation"
                label="Designation"
                rules={schemaRules}
                required
              >
                <Select options={optionsdesignation} />
              </Form.Item>
              <Form.Item
                name="appointmentType"
                label="Appointment Type"
                rules={schemaRules}
                required
              >
                <Select options={optionsappointmentType} />
              </Form.Item>
              <Form.Item
                name="appointmentSubtype"
                label="Appointment Sub Type"
                rules={schemaRules}
                required
              >
                <Select options={optionsappointmentSubtype} />
              </Form.Item>
              <Form.Item
                name="mobile"
                label="Mobile Number"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="altMobile"
                label="Alternate Mobile Number"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="personalEmail"
                label="Personal Email id"
                rules={schemaRules}
                required
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Official Email id"
                rules={schemaRules}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                name="appointmentDate"
                label="Date of Appointment"
                rules={schemaRules}
                required
              >
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                />
              </Form.Item>
              <Form.Item
                name="joiningDate"
                label="Date of Joining"
                rules={schemaRules}
                required
              >
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                />
              </Form.Item>
              <Title level={5}>
                Once the User is created, it cannot be deleted!
              </Title>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('Should confirm updates.')),
                  },
                ]}
              >
                <Checkbox>I confirm to create/add above User!</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default CreateEmployeeForm;
function useState(arg0: {}[]): [any, any] {
  throw new Error('Function not implemented.');
}

function setFields(arg0: any[]) {
  throw new Error('Function not implemented.');
}
