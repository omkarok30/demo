import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import * as modelSemesterEndQuestionPapersDetails from '@/models/Employee/DetailsOfActivity/SemesterEndQuestionPapersDetails/SemesterEndQuestionPapersDetails'
import { useEmployeeSemesterEndQuestionPapersDetailsList } from '@/store/employee/DetailsOfActivity/SemesterEndQuestionPapersDetails/useSemesterEndQuestionPapersDetails';
import { useSettings } from '@/store/settings/useSettings';
import { When } from 'react-if';
import SemesterEndQuestionPapersDetailsEdit from '../form/edit';

const SemesterEndQuestionPapersDetails = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const storeSemesterEndQuestionPapersDetails = useEmployeeSemesterEndQuestionPapersDetailsList((state: any) => ({
        allRecords: state.allRecords,
        getRecords: state.getRecords,
    }));

    const navigateToNewForm = () => {
        navigate('../edit/new');
    };

    const handleActionClick = ({ action, record }) => {
        if (action === 'edit') {
            navigate(`/Employee/employee_semester_end_question_papers_details/edit/${record?.id}`, { state: { id: record?.id } });
        }
    };

    React.useEffect(() => {
        fetchSettings();
        storeSemesterEndQuestionPapersDetails.getRecords();
    }, []);

    const columns: ColumnsType<any> = React.useMemo(() => {
        let cols = modelSemesterEndQuestionPapersDetails.columns(settings);
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
        navigate(`/Employee/employee_semester_end_question_papers_details/edit/new`);
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

    const [semesterEndQuestioPaperProps, setSemesterEndQuestioPaperProps] = React.useState({
        open: false,
        id: '',
        studentId: '',
    });

    const editdetails = (editid: any) => {
        setSemesterEndQuestioPaperProps({
            ...semesterEndQuestioPaperProps,
            open: true,
            studentId: `${id}`,
            id: editid,
        });
    };

    const semesterEndQuestioPaperOk = (studentId: string, _values: any) => {
        setSemesterEndQuestioPaperProps({ ...semesterEndQuestioPaperProps, open: false, id: '', studentId: '' });
    };
    const semesterEndQuestioPaperCancel = () => {
        setSemesterEndQuestioPaperProps({ ...semesterEndQuestioPaperProps, open: false, id: '', studentId: '' });
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
                <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeSemesterEndQuestionPapersDetails.allRecords} />
                <When condition={semesterEndQuestioPaperProps.open === true}>
                    {() => (
                        <SemesterEndQuestionPapersDetailsEdit
                            {...semesterEndQuestioPaperProps}
                            handleOk={semesterEndQuestioPaperOk}
                            handleCancel={semesterEndQuestioPaperCancel}
                        />
                    )}
                </When>
            </div>
        </div>
    );
};

export default SemesterEndQuestionPapersDetails;
