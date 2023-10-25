import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, DatePicker, Input, Radio, Row, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { useSettings } from '@/store/settings/useSettings';
import * as modelEmployeeDetails from '@/models/Employee/EmployeeDetails';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
const yesNo = todoLookUps.getState().yesNo;
const gender = todoLookUps.getState().gender;
const salutation = todoLookUps.getState().salutation;
const maritalStatus = todoLookUps.getState().maritalStatus;
const motherTongue = todoLookUps.getState().motherTongue;
const religion = todoLookUps.getState().religion;
//const caste = todoLookUps.getState().caste;
const feeCategory = todoLookUps.getState().feeCategory;
const PersonalDetails = () => {
    const global = useGlobalState((state: any) => state.default);
    const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
    const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
    const [form] = Form.useForm();
    const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
    const [optionsCaste, setOptionsCaste] = useState([{}]);
    const [admissionProcessBy, setAdmissionProcessBy] = useState();
    const { id } = useParams();
    const isNew = id === 'new';
    const storeEmployeeDetails = useEmployeeDetails(
        (state: any) => ({
            getRecord: state.getRecord,
            current: state.current,
            addRecord: state.addRecord,
            updateRecord: state.updateRecord,
        }),
    );

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

    const onReligionChange = (event: any) => {
        form.setFields([{ name: "cast", value: '' }])
        let caste: any
        caste = todoLookUps.getState().caste?.find((obj: any) => obj[event]);
        if (caste) {
            setOptionsCaste(caste[event]);
        } else {
            setOptionsCaste([])
        }
    };

    
    const onFormSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                setSaveProgress({ ...saveProgress, disableSubmit: true });
                if (isNew) {
                    const record = await storeEmployeeDetails.addRecord(values);
                    if (!isEmptyValue(record)) {
                        notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
                    }
                }
                else {
                    const record = await storeEmployeeDetails.updateRecord(id, values);
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

    return (
        <Form form={form} layout="vertical" >
            <Row className="justify-center">
                <Col className='w-md' span={20}>
                    <Row>
                        <Col span={12}>
                            <Form.Item name="dateOfBirth" label="Date of Birth" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                                <DatePicker className="w-100%" format={global.displayDateFormat}
                                //  disabledDate={disabledDate} defaultPickerValue={defaultPickerValue} 
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="motherTongue" label="Mother Tongue" style={{ fontWeight: 'bold' }} rules={[{ required: true }]}>
                                <Select style={{ textTransform: 'uppercase' }}
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                    options={motherTongue}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item name="placeOfBirth" label="Place of Birth" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="religion" label="Religion" style={{ fontWeight: 'bold' }} rules={[{ required: true }]}>
                                <Select style={{ textTransform: 'uppercase' }}
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                    options={religion}
                                    onChange={event => onReligionChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item name="fatherName" label="Father's Name" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="cast" label="Caste" style={{ fontWeight: 'bold' }} rules={[{ required: true }]} >
                                <Select style={{ textTransform: 'uppercase' }}
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                    options={optionsCaste}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item name="spouseName" label="Spouse's Name" rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="category" label="Caste Category" style={{ fontWeight: 'bold' }} rules={[{ required: true }]}>
                                <Select style={{ textTransform: 'uppercase' }}
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                    options={feeCategory}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item name="motherName" label="Mother's Name" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="subCast" label="Sub Caste" style={{ fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item name="maritalStatus" label="Marital Status" rules={[{ required: true }]} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                                <Select style={{ textTransform: 'uppercase' }}
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                    options={maritalStatus}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="height" label="Height (in CM)" style={{ fontWeight: 'bold' }} rules={schemaRules} >
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item name="nationality" label="Nationality" rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="handicap" label="Handicapped" style={{ fontWeight: 'bold' }}>
                                <Select style={{ textTransform: 'uppercase' }}
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                    options={yesNo}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col className='w-md' span={6} >
                    <Affix offsetBottom={12}  >
                        <Form.Item>
                            <Button type="primary"
                                onClick={onFormSubmit}
                                disabled={saveProgress.disableSubmit}
                                loading={saveProgress.saving}>
                                Update
                            </Button>
                        </Form.Item>
                    </Affix>
                </Col>
            </Row >
        </Form >
    )
};

export default PersonalDetails;
