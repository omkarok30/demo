import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import * as modelGuidedStudentDetailsList from '@/models/Employee/DetailsOfActivity/GuidedStudentDetails/GuidedStudentDetails'
import { useGuidedStudentDetailsList } from '@/store/employee/DetailsOfActivity/GuidedStudentDetails/useGuidedStudentDetail';

import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
};
const GuidedStudentDetailsList = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const storeGuidedStudentDetailsList = useGuidedStudentDetailsList((state: any) => ({
        allRecords: state.allRecords,
        getRecords: state.getRecords,
    }));



    const navigateToNewForm = () => {
        navigate('../edit/new');
    };

    const handleActionClick = ({ action, record }) => {
        if (action === 'edit') {
            navigate(`/Employee/employee_guided_student_details/edit/${record?.id}`, { state: { id: record?.id } });
        }
    };

    React.useEffect(() => {
        fetchSettings();
        storeGuidedStudentDetailsList.getRecords();
    }, []);

    const columns: ColumnsType<any> = React.useMemo(() => {
        let cols = modelGuidedStudentDetailsList.columns(settings);
        cols.push({
            title: 'Action',
            key: 'action',
            render: (_, record) => [
                <Row>
                    <Col span={16}>
                        <Button type="primary" onClick={() => handleActionClick({ action: 'edit', record })}>
                            View/Update
                        </Button>
                    </Col>
                </Row>
            ],
        });
        //cols = attachRenderer(cols, renderers);
        return cols;
    }, [settings]);

    const navigateToNewForm1 = () => {
        //navigate('../edit/new');
        navigate(`/Employee/employee_guided_student_details/edit/new`);
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
            {open && <Modal style={{ justifyContent: 'center', alignItems: 'center' }} centered
                title="CONFIRMATION"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}>
                <p>Do you wish to continue this transaction?</p>
            </Modal>
            }
            <div style={{ marginTop: 20 }}>
                <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeGuidedStudentDetailsList.allRecords} />
            </div>
        </div>
    );
};

export default GuidedStudentDetailsList;
