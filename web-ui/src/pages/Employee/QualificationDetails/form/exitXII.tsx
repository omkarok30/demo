import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Radio, Row, Upload, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import * as modelEmployeeQualificationDetails from '@/models/Employee/EmployeeQualification';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeQualificationDetails } from '@/store/employee/useEmployeeQualificationDetails';
import { UploadOutlined } from '@ant-design/icons';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
const graduationYear = todoLookUps.getState().graduationYear;
import { UploadFileStatus } from 'antd/lib/upload/interface';
const QualificationDetailsFormXIIEdit = (props) => {
    const { id, empId } = useParams();
    const isNew = id === 'new';
    const navigate = useNavigate();
    const global = useGlobalState((state: any) => state.default);
    const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
    const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeQualificationDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

    const renderers = {
        departmentId: (value: string) => <DepartmentAsText value={value} />
    };

    const storeEmployeeQualificationDetails = useEmployeeQualificationDetails(
        (state: any) => ({
            getRecord: state.getRecord,
            current: state.current,
            addRecord: state.addRecord,
            updateRecord: state.updateRecord,
        }),
    );

    const storeEmployeeDetails = useEmployeeDetails(
        (state: any) => ({
            getRecord: state.getRecord,
            current: state.current,
            addRecord: state.addRecord,
            updateRecord: state.updateRecord,
        }),
    );

    const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
    const [form] = Form.useForm();

    React.useEffect(() => {
        storeEmployeeQualificationDetails.getRecord(id);
        return () => {
            form.setFieldsValue({});
        };
    }, [id]);

    React.useEffect(() => {
        if (storeEmployeeQualificationDetails.current.id !== id) {
            return;
        }
        form.setFieldsValue(storeEmployeeQualificationDetails.current);
    }, [storeEmployeeQualificationDetails.current]);


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

    React.useEffect(() => {
        storeEmployeeDetails.getRecord(empId);
        return () => {
            form.setFieldsValue({});
        };
    }, [empId]);

    React.useEffect(() => {
        if (storeEmployeeDetails.current.id !== empId) {
            return;
        }
        form.setFieldsValue(storeEmployeeDetails.current);
    }, [storeEmployeeDetails.current]);

    const nvaigateToPreviousPage = () => {
        navigate(`/employee/employee_details/edit/${empId}`, { state: { activeTab: 'qualification_details' } });
    }

    const onFormSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                setSaveProgress({ ...saveProgress, disableSubmit: true });
                if (isNew) {
                    const record = await storeEmployeeQualificationDetails.addRecord(values);
                    if (!isEmptyValue(record)) {
                        notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
                    }
                }
                else {
                    const record = await storeEmployeeQualificationDetails.updateRecord(id, values);
                    if (!isEmptyValue(record)) {
                        notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.firstName}` });
                    }
                }
                setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
            })
            .catch(() => {
                notification.error({ message: 'Validations failed' });
                setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
            });
    };

    const headerLabel = isNew ? 'Add Qualification' : 'Update Qualification Details';

    const getFile = (e: UploadFileStatus) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }
        //  return e && e.fileList;
    };


    return (
        <div>
            <When condition={!isNew}>
                {() => (<>
                    <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
                        <Form.Item name="specialization" label="Specialization" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                            <Input style={{ textTransform: 'uppercase' }} placeholder='FOR EXAMPLE: SOFTWARE' />
                        </Form.Item>
                        <Form.Item name="percentage" label="Percentage/CGPA" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                            <Input style={{ textTransform: 'uppercase' }} placeholder='FOR EXAMPLE: 78.96' />
                        </Form.Item>
                        <Form.Item name="passingYear" label="Graduating Year" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                            <Select style={{ textTransform: 'uppercase' }}
                                placeholder="Select a option and change input text above"
                                allowClear
                                options={graduationYear}
                            />
                        </Form.Item>
                        <Form.Item name="collegeName" label="School/College Name" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                            <Input style={{ textTransform: 'uppercase' }} placeholder='FOR EXAMPLE: LOTUS SCHOOL' />
                        </Form.Item>
                        <Form.Item name="universityName" label="University Board" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                            <Input style={{ textTransform: 'uppercase' }} placeholder='FOR EXAMPLE: SOLPAUR UNIVERSITY' />
                        </Form.Item>
                        <Form.Item rules={schemaRules} name="certificateDocument" label="Upload Certificate" getValueFromEvent={getFile} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                            <Upload>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                        <h4 style={{ color: 'red', }}>Note: The size of certificate should be less than 1Mb (JPEG,PDF).</h4>
                    </Form>
                </>)}
            </When>
            <When condition={isNew}>
                <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
                    <Form.Item name="specialization" label="Specialization" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                        <Input style={{ textTransform: 'uppercase' }} placeholder='FOR EXAMPLE: SOFTWARE' />
                    </Form.Item>
                    <Form.Item name="percentage" label="Percentage/CGPA" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                        <Input style={{ textTransform: 'uppercase' }} placeholder='FOR EXAMPLE: 78.96' />
                    </Form.Item>
                    <Form.Item name="passingYear" label="Graduating Year" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                        <Select style={{ textTransform: 'uppercase' }}
                            placeholder="Select a option and change input text above"
                            allowClear
                            options={graduationYear}
                        />
                    </Form.Item>
                    <Form.Item name="collegeName" label="School/College Name" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                        <Input style={{ textTransform: 'uppercase' }} placeholder='FOR EXAMPLE: LOTUS SCHOOL' />
                    </Form.Item>
                    <Form.Item name="universityName" label="University Board" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                        <Input style={{ textTransform: 'uppercase' }} placeholder='FOR EXAMPLE: SOLPAUR UNIVERSITY' />
                    </Form.Item>
                    <Form.Item rules={schemaRules} name="certificateDocument" label="Upload Certificate" getValueFromEvent={getFile} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <h4 style={{ color: 'red', }}>Note: The size of certificate should be less than 1Mb (JPEG,PDF).</h4>
                </Form>
            </When>
            <Form.Item>
                <Button type="primary" onClick={onFormSubmit} disabled={saveProgress.disableSubmit} loading={saveProgress.saving} style={{ marginRight: 10 }}>
                    Submit
                </Button>
                <Button type="default" disabled={saveProgress.disableSubmit} loading={saveProgress.saving}>
                    Reset
                </Button>
            </Form.Item>
        </div>);
};

export default QualificationDetailsFormXIIEdit;
