import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeTechnicalSkills from '@/models/Employee/EmployeeTechnicalSkills';
import { useEmployeeTechnicalSkills } from '@/store/employee/useEmployeeTechnicalSkills';
import { isEmptyValue } from '@/utils/object';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { EditIcon } from '@/components/Icons/EditIcon';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';

const EmployeeTechnicalSkillsList = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);

    const storeEmployeeTechnicalSkills = useEmployeeTechnicalSkills((state: any) => ({
        allRecords: state.allRecords,
        getRecords: state.getRecords,
        deleteRecord: state.deleteRecord,
    }));

    const storeEmployeeDetails = useEmployeeDetails((state: any) => ({
        getRecord: state.getRecord,
        current: state.current,
        addRecord: state.addRecord,
        updateRecord: state.updateRecord,
    }));


    React.useEffect(() => {
        storeEmployeeDetails.getRecord(id);
        return () => {
            form.setFieldsValue({});
        };
    }, [id]);

    React.useEffect(() => {
        if (storeEmployeeDetails.current.id !== id) {
            return;
        }
        form.setFieldsValue(storeEmployeeDetails.current);
    }, [storeEmployeeDetails.current]);


    const navigateToNewForm = () => {
        navigate('../edit/new');
    };

    const handleActionClick = ({ action, record }) => {
        if (action === 'edit') {
            navigate(`/Employee/employee_technical_skills/edit/${id}/${record?.id}`, { state: { id: record?.id } });
        }
        else if (action === 'delete') {
            storeEmployeeTechnicalSkills.deleteRecord(record.id);
        }
    };

    React.useEffect(() => {
        fetchSettings();
        storeEmployeeTechnicalSkills.getRecords();
    }, []);

    const columns: ColumnsType<any> = React.useMemo(() => {
        let cols = modelEmployeeTechnicalSkills.columns(settings);
        cols.push({
            title: 'Document',
            dataIndex: 'uploadDocument',
            render: (_, record) =>
                isEmptyValue(record.uploadDocument)
                    ? [
                        <span>
                            <Button
                                type='link'
                                onClick={() => {
                                    alert('Not provided');
                                }}
                            >
                                NA
                            </Button>
                        </span>,
                    ]
                    : [
                        <span>
                            <a href={record.uploadDocument}>
                                <DownloadOutlined />
                            </a>
                        </span>,
                    ],
        });
        cols.push({
            title: 'Action',
            key: 'action',
            render: (_, record) => [

                // <Button type="link" style={{ backgroundColor: '#2063B0', color: 'white' }} 
                // onClick={() => handleActionClick({ action: 'edit', record })}>View/Update</Button>

                <span>
                    <Button
                        type="link"
                        onClick={() => handleActionClick({ action: 'edit', record })}
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        type="link"
                        style={{ color: 'red' }}
                        //onClick={() => handleActionClick({ action: 'edit', record })}
                        onClick={() =>
                            handleActionClick({
                                action: 'delete',
                                record,
                                //activityName: 'cultural',
                            })
                        }
                    >
                        <DeleteIcon />
                    </Button>
                </span>,
            ],
        });
        //cols = attachRenderer(cols, renderers);
        return cols;
    }, [settings]);

    const navigateToNewForm1 = () => {
        //navigate('../edit/new');
        navigate(`/Employee/employee_technical_skills/edit/${id}/new`, { state: { empId: id }});
    };

    return (
        <div className='layout-main-content'>
            <Card
                bordered={false}
                title="Technical Skills"
            >
                <Row justify="end">
                    <Col>
                        <Button type="primary" onClick={navigateToNewForm1}>
                            Add Skill
                        </Button>
                    </Col>
                </Row>
                <div style={{ marginTop: 20 }}>
                    <Table bordered scroll={{ x: 350 }} columns={columns} dataSource={storeEmployeeTechnicalSkills.allRecords} />
                </div>
            </Card>
        </div>
    );
};

export default EmployeeTechnicalSkillsList;
