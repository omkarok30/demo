import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import * as modelExtentionActivityDetailsList from '@/models/Employee/DetailsOfActivity/ExtentionActivityDetails/ExtentionActivityDetails'
import { useExtentionActivityDetailsList } from '@/store/employee/DetailsOfActivity/ExtentionActivityDetails/useExtentionActivityDetails';

import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { When } from 'react-if';
import ExtentionActivityDetailsEdit from '../form/edit';

const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
};
const ExtentionActivityDetailsList = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const storeExtentionActivityDetailsList = useExtentionActivityDetailsList((state: any) => ({
        allRecords: state.allRecords,
        getRecords: state.getRecords,
    }));



    const navigateToNewForm = () => {
        navigate('../edit/new');
    };

    const handleActionClick = ({ action, record }) => {
        if (action === 'edit') {
            navigate(`/Employee/employee_extention_activity_details/edit/${record?.id}`, { state: { id: record?.id } });
        }
    };

    React.useEffect(() => {
        fetchSettings();
        storeExtentionActivityDetailsList.getRecords();
    }, []);

    const columns: ColumnsType<any> = React.useMemo(() => {
        let cols = modelExtentionActivityDetailsList.columns(settings);
        cols.push({
            title: 'Action',
            key: 'action',
            render: (_, record) => [
                <Row>
                    <Col span={16}>
                        <Button type="primary"
                            // onClick={() => handleActionClick({ action: 'edit', record })}
                            onClick={() => editdetails(`${record?.id}`)}
                        >
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
        navigate(`/Employee/employee_extention_activity_details/edit/new`);
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

    const [extentionActivityProps, setExtentionActivityProps] = React.useState({
        open: false,
        id: '',
        studentId: '',
    });

    const editdetails = (editid: any) => {
        setExtentionActivityProps({
            ...extentionActivityProps,
            open: true,
            studentId: `${id}`,
            id: editid,
        });
    };

    const extentionActivityOk = (studentId: string, _values: any) => {
        setExtentionActivityProps({ ...extentionActivityProps, open: false, id: '', studentId: '' });
    };
    const extentionActivityCancel = () => {
        setExtentionActivityProps({ ...extentionActivityProps, open: false, id: '', studentId: '' });
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
                <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeExtentionActivityDetailsList.allRecords} />
                <When condition={extentionActivityProps.open === true}>
                    {() => (
                        <ExtentionActivityDetailsEdit
                            {...extentionActivityProps}
                            handleOk={extentionActivityOk}
                            handleCancel={extentionActivityCancel}
                        />
                    )}
                </When>
            </div>
        </div>
    );
};

export default ExtentionActivityDetailsList;
