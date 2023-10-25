import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined, PlusCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import * as modelGuestLecturerDetailsList from '@/models/Employee/DetailsOfActivity/GuestLecturerDetails/GuestLecturerDetails';
import { useGuestLecturerDetailsList } from '@/store/employee/DetailsOfActivity/GuestLecturerDetails/useGuestLecturerDetail';
import { isEmptyValue } from '@/utils/object';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { When } from 'react-if';
import EmployeeGuestLecturerDetailsEdit from '../form/edit';
const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
};
const GuestLecturerDetailsList = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const storeGuestLecturerDetailsList = useGuestLecturerDetailsList((state: any) => ({
        allRecords: state.allRecords,
        getRecords: state.getRecords,
    }));



    const navigateToNewForm = () => {
        navigate('../edit/new');
    };

    const handleActionClick = ({ action, record }) => {
        if (action === 'edit') {
            navigate(`/Employee/employee_guest_lecturer_details/edit/${record?.id}`, { state: { id: record?.id } });
        }
    };

    React.useEffect(() => {
        fetchSettings();
        storeGuestLecturerDetailsList.getRecords();
    }, []);

    const columns: ColumnsType<any> = React.useMemo(() => {
        let cols = modelGuestLecturerDetailsList.columns(settings);
        cols.push({
            title: 'Document',
            dataIndex: 'document',
            render: (_, record) =>
                isEmptyValue(record.document)
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
                            <a href={record.document}>
                                <DownloadOutlined />
                            </a>
                        </span>,
                    ],
        });
        cols.push({
            title: 'Action',
            key: 'action',
            render: (_, record) => [
                <Row>
                    <Col span={16}>
                        <Button type="primary"
                            //onClick={() => handleActionClick({ action: 'edit', record })}
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
        navigate(`/Employee/employee_guest_lecturer_details/edit/new`);
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

    const [guestLectureProps, setGuestLectureProps] = React.useState({
        open: false,
        id: '',
        studentId: '',
    });

    const editdetails = (editid: any) => {
        setGuestLectureProps({
            ...guestLectureProps,
            open: true,
            studentId: `${id}`,
            id: editid,
        });
    };

    const guestLectureOk = (studentId: string, _values: any) => {
        setGuestLectureProps({ ...guestLectureProps, open: false, id: '', studentId: '' });
    };
    const guestLectureCancel = () => {
        setGuestLectureProps({ ...guestLectureProps, open: false, id: '', studentId: '' });
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
                <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeGuestLecturerDetailsList.allRecords} />
                <When condition={guestLectureProps.open === true}>
                    {() => (
                        <EmployeeGuestLecturerDetailsEdit
                            {...guestLectureProps}
                            handleOk={guestLectureOk}
                            handleCancel={guestLectureCancel}
                        />
                    )}
                </When>
            </div>
        </div>
    );
};

export default GuestLecturerDetailsList;
