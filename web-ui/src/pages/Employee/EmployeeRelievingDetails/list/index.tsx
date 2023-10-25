import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeRelievingDetails from '@/models/Employee/EmployeeRelievingDetails';
import { useEmployeeRelievingDetails } from '@/store/employee/useEmployeeRelievingDetails';
import { useGlobalState } from '@/store/global';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { todoLookUps } from '@/store/todoLookUps';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { UploadFileStatus } from 'antd/lib/upload/interface';
const employmentStatus = todoLookUps.getState().employmentStatus;
import Resigned from './resigned';
import Terminated from './terminated';
import Transfer from './transfer';
const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeeRelievingDetailsList = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);
    const [isEmploymentStatus, setIsEmploymentStatus] = useState('');
    const global = useGlobalState((state: any) => state.default);
    const storeEmployeeRelievingDetails = useEmployeeRelievingDetails((state: any) => ({
        allRecords: state.allRecords,
        getRecords: state.getRecords,
    }));



    const navigateToNewForm = () => {
        navigate('../edit/new');
    };

    const handleActionClick = ({ action, record }) => {
        if (action === 'edit') {
            navigate(`/Employee/employee_relieving_details/edit/${record?.id}`, { state: { id: record?.id } });
        }
    };

    React.useEffect(() => {
        fetchSettings();
        storeEmployeeRelievingDetails.getRecords();
    }, []);

    const columns: ColumnsType<any> = React.useMemo(() => {
        let cols = modelEmployeeRelievingDetails.columns(settings);
        cols.push({
            title: 'Action',
            key: 'action',
            render: (_, record) => [<Button type="link" style={{ backgroundColor: '#2063B0', color: 'white' }} onClick={() => handleActionClick({ action: 'edit', record })}>View/Update</Button>],
        });
        //cols = attachRenderer(cols, renderers);
        return cols;
    }, [settings]);

    const columns1: ColumnsType<any> = React.useMemo(() => {
        let cols = modelEmployeeRelievingDetails.columns1(settings);

        cols = attachRenderer(cols, renderers);
        return cols;
    }, [settings]);
    const handleChange = (value: string) => {
        console.log(`selectedhandleChange ${value}`);
        setIsEmploymentStatus(value)
    };


    const getFile = (e: UploadFileStatus) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }
        //  return e && e.fileList;
    };


    return (
        <div className='layout-main-content'>
            <Card
                bordered={false} >
                <Row className="justify-center">
                    <Col className='w-md' span={16}>
                        <div>
                            <Form form={form} layout="vertical" >
                                <Form.Item name="employmentStatus" label="Employment Status" style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                                    <Select style={{ textTransform: 'uppercase' }}
                                        placeholder="SELECT FROM DROPDOWN"
                                        allowClear
                                        onChange={handleChange}
                                        options={employmentStatus}
                                    />
                                </Form.Item>
                                {isEmploymentStatus == 'INACTIVE' && <Form.Item name="reasonForDeactivation" label="Reason for Deactivation" style={{ flex: 1, marginRight: 10, fontWeight: 'bold', marginTop: 20 }}>
                                    <Input.TextArea style={{ textTransform: 'uppercase' }} rows={3} />
                                </Form.Item>
                                }
                                {isEmploymentStatus == 'RETIRED' && <Form.Item name="Date of Retirement" label="Date of Retirement" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                                    <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                                </Form.Item>
                                }
                                {isEmploymentStatus == 'RESIGNED' && <Resigned />}
                                {isEmploymentStatus == 'TERMINATED/REMOVED' && <Terminated />}
                                {isEmploymentStatus == 'TRANSFER' && <Transfer />}
                            </Form>

                        </div>
                        <Row className="justify-center" >
                            <Col className='w-md' span={16}>
                                <Form.Item >
                                    <Button type="primary"
                                    // onClick={onFormSubmit}
                                    // disabled={saveProgress.disableSubmit}
                                    // loading={saveProgress.saving}
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Card>
            <Card
                bordered={false}
                title="Active/Inactive status" >
                {/* <div style={{ marginTop: 20 }}>
                    <Table columns={columns1} dataSource={data} />
                </div> */}
                <Row className="mt-5">
                    <Col span={24}>
                        <Table
                            bordered
                            columns={columns1}
                            dataSource={storeEmployeeRelievingDetails.allRecords}
                        />
                    </Col>
                </Row>
            </Card>
            <Card
                bordered={false}
                title="Relieving History" >
                <div style={{ marginTop: 20 }}>
                    <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeEmployeeRelievingDetails.allRecords} />
                </div>
            </Card>
        </div>
    );
};

export default EmployeeRelievingDetailsList;
