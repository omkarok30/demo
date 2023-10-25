import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Checkbox, notification, Descriptions, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmptyValue } from '@/utils/object';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeInstituteLevel from '@/models/Academics/VisionAndMission/InstituteLevel';

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

const yearOfPublication = todoLookUps.getState().academicYear;

const academicYear = todoLookUps.getState().academicYear;
const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
};
const CreateVisionMissionForm = () => {
    const { id } = useParams();
    const isNew = id === 'new';
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);
    const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
    const [isCurrentlyHoldingThisPosition, setIsCurrentlyHoldingThisPosition] = React.useState(true)
    const [isHODPosition, setisHODPosition] = React.useState(false)
    const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeInstituteLevel.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

    const global = useGlobalState((state: any) => state.default);



    const headerLabel = isNew ? 'Add Book Detail' : 'Edit Book Details';


    const navigateToNewForm = () => {
        navigate('../edit/new');
    };



    const nvaigateToPreviousPage = () => {
        // navigate(`/employee/employee_details/edit/${empId}`, { state: { activeTab: 'positions'} });
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

    const handleChange = (value: string) => {
        console.log(`selectedvaluevalue ${value}`);
        //setEducationLevel(value)
    };

    return (
        <div className='layout-main-content'>
            <Card
                bordered={false}
            >
                <Row className='justify-center'>
                    <Col span={12}>
                        <Form
                            form={form}
                            layout="vertical"
                            autoComplete="off" >
                            <Form.Item name="fromYear" label="From Year" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                                <Select onChange={handleChange} options={academicYear} />
                            </Form.Item>
                            <Form.Item name="vision" label="Vision" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                                <Input.TextArea placeholder='ENTER VISION' rows={3} />
                            </Form.Item>
                            <Form.Item name="vision" label="Approved In" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                                <Input />
                            </Form.Item>

                            <Form.Item name="mision" label="Mission" required style={{ fontWeight: 'bold' }}>
                                <Input.TextArea placeholder='ENTER MISSION' rows={3} />
                            </Form.Item>
                            <Form.Item name="mision" label="Approved In" style={{ fontWeight: 'bold' }}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="isMissionComponent" label="Mission Component" style={{ fontWeight: 'bold' }}
                                rules={[{ required: true, message: "Please select an option!" }]}
                            >
                                <Radio.Group>
                                    <Radio value='yes'>Yes</Radio>
                                    <Radio value='no'>No</Radio>

                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="mision" label="M1:" style={{ fontWeight: 'bold' }}>
                                <Input.TextArea placeholder='ENTER MISSION COMPONENT' rows={3} />
                            </Form.Item>
                            <Form.Item name="momDocument" label="Upload MoM" getValueFromEvent={getFile} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                                <Upload>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>

                            <div style={{ margin: 10 }}>
                                <Checkbox checked={true}
                                // onChange={e => setIsSame(e.target.checked)} checked={isSame}
                                // onChange={onChange}
                                ><h4>Vision and Mission is same till current Academic Year</h4></Checkbox>
                            </div>

                            <h4>"Once the record is added in the system, cannot be added or deleted."</h4>
                            <div style={{ margin: 10 }}>
                                <Checkbox checked={false}
                                // onChange={e => setIsSame(e.target.checked)} checked={isSame}
                                // onChange={onChange}
                                ><h4>I confirm to create the above VISION & MISSIONs.</h4></Checkbox>
                            </div>

                            <Form.Item className='text-center' style={{ fontWeight: 'bold',marginTop:10 }}>
                                <Button className='mt-4' type="primary" >
                                    Proceed
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default CreateVisionMissionForm;
