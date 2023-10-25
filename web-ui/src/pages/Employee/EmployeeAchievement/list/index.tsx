import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeAchievement from '@/models/Employee/EmployeeAchievement'
import { useEmployeeAchievement } from '@/store/employee/useAchievement';

import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
};
const AchievementList = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);

    const storeEmployeeAchievement = useEmployeeAchievement((state: any) => ({
        allRecords: state.allRecords,
        getRecords: state.getRecords,
    }));



    const navigateToNewForm = () => {
        navigate('../edit/new');
    };

    const handleActionClick = ({ action, record }) => {
        if (action === 'edit') {
            navigate(`/Employee/employee_achievement/edit/${record?.id}`, { state: { id: record?.id } });
        }
    };

    React.useEffect(() => {
        fetchSettings();
        storeEmployeeAchievement.getRecords();
    }, []);

    const columns: ColumnsType<any> = React.useMemo(() => {
        let cols = modelEmployeeAchievement.columns(settings);
        cols.push({
            title: 'Action',
            key: 'action',
            render: (_, record) => [<Button type="link" style={{ backgroundColor: '#2063B0', color: 'white' }} onClick={() => handleActionClick({ action: 'edit', record })}>View/Update</Button>],
        });
        //cols = attachRenderer(cols, renderers);
        return cols;
    }, [settings]);

    const navigateToNewForm1 = () => {
        //navigate('../edit/new');
        navigate(`/Employee/employee_achievement/edit/new`);
    };

    return (
        <div className='layout-main-content'>
            <Card
                bordered={false}
                title="Achievement"
            >
                <Row justify="end">
                    <Col>
                        <Button type="primary" onClick={navigateToNewForm1}>
                            Add Achievement
                        </Button>
                    </Col>
                </Row>
                <div style={{marginTop:20}}>
                    <Table bordered scroll={{ x: 350 }} columns={columns} dataSource={storeEmployeeAchievement.allRecords} />
                </div>
            </Card>
        </div>
    );
};

export default AchievementList;
