import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined, PlusCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import * as modelInnovationInTeachingLearning from '@/models/Employee/DetailsOfActivity/InnovationInTeachingLearning/InnovationInTeachingLearning'
import { useInnovationInTeachingLearningList } from '@/store/employee/DetailsOfActivity/InnovationInTeachingLearning/useInnovationInTeachingLearning';
import { isEmptyValue } from '@/utils/object';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import InnovationInTeachingLearningEdit from '../form/edit';
import { When } from 'react-if';
const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
};
const InnovationInTeachingLearningList = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);
    const [open, setOpen] = useState(false);
    const [openDesc, setOpenDesc] = useState(false);
    const [desc, setDesc] = useState('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const storeInnovationInTeachingLearningList = useInnovationInTeachingLearningList((state: any) => ({
        allRecords: state.allRecords,
        getRecords: state.getRecords,
    }));




    const navigateToNewForm = () => {
        navigate('../edit/new');
    };

    const handleActionClick = ({ action, record }) => {
        if (action === 'edit') {
            navigate(`/Employee/employee_innovation_in_teaching_learning/edit/${record?.id}`, { state: { id: record?.id } });
        }
    };

    React.useEffect(() => {
        fetchSettings();
        storeInnovationInTeachingLearningList.getRecords();
    }, []);


    const columns: ColumnsType<any> = React.useMemo(() => {
        let cols = modelInnovationInTeachingLearning.columns(settings);
        cols.push({
            title: 'Short Description',
            dataIndex: 'description',
            render: (_, record) =>
                isEmptyValue(record.description)
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
                        <Row>
                            <Col span={16}>
                                <Button type="primary"
                                    //onClick={() => handleActionClick({ action: 'edit', record })}
                                    onClick={() => editdetails1(`${record?.description}`)}
                                >
                                    View
                                </Button>
                            </Col>
                        </Row>
                    ],
        });
        cols.push({
            title: 'Upload Detailed Description',
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
        navigate(`/Employee/employee_innovation_in_teaching_learning/edit/new`);
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

    const handleOk1 = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenDesc(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel1 = () => {
        console.log('Clicked cancel button');
        setOpenDesc(false);
    };

    const [innovationTeachingProps, setInnovationTeachingProps] = React.useState({
        open: false,
        id: '',
        studentId: '',
    });

    const editdetails = (editid: any) => {
        setInnovationTeachingProps({
            ...innovationTeachingProps,
            open: true,
            studentId: `${id}`,
            id: editid,
        });
    };

    const editdetails1 = (editid: any) => {
        setDesc(editid),
        setOpenDesc(true)
    };

    const innovationTeachingOk = (studentId: string, _values: any) => {
        setInnovationTeachingProps({ ...innovationTeachingProps, open: false, id: '', studentId: '' });
    };
    const innovationTeachingCancel = () => {
        setInnovationTeachingProps({ ...innovationTeachingProps, open: false, id: '', studentId: '' });
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
            {openDesc && <Modal style={{ justifyContent: 'center', alignItems: 'center' }} centered
                title="VIEW DESCRIPTION"
                open={openDesc}
                okText={''}
                confirmLoading={confirmLoading}
                onCancel={handleCancel1}>
                <p style={{color:'#ff33ff',textTransform:'uppercase'}}>{desc}</p>
            </Modal>
            }
            <div style={{ marginTop: 20 }}>
                <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeInnovationInTeachingLearningList.allRecords} />
                <When condition={innovationTeachingProps.open === true}>
                    {() => (
                        <InnovationInTeachingLearningEdit
                            {...innovationTeachingProps}
                            handleOk={innovationTeachingOk}
                            handleCancel={innovationTeachingCancel}
                        />
                    )}
                </When>
            </div>
        </div>
    );
};

export default InnovationInTeachingLearningList;
