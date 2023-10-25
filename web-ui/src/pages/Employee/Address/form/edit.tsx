import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Radio, Row, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { useSettings } from '@/store/settings/useSettings';
import * as modelEmployeeAddressDetails from '@/models/Employee/EmployeeAddress';
import { useEmployeeAddress } from '@/store/employee/useEmployeeAddress';
const yesNo = todoLookUps.getState().yesNo;
const gender = todoLookUps.getState().gender;
const locationType = todoLookUps.getState().locationType;
const countries = todoLookUps.getState().countries;
const state = todoLookUps.getState().state;
const district = todoLookUps.getState().district;
const AddressDetails = () => {
    const global = useGlobalState((state: any) => state.default);
    const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
    const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeAddressDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
    const [isSame, setIsSame] = React.useState(true);
    const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
    const [states, setStates] = React.useState<any[]>([]);
    const [districts, setDistricts] = React.useState<any[]>([]);

    const [form] = Form.useForm();
    const { id } = useParams();
    const isNew = id === 'new';
    const storeEmployeeAddress = useEmployeeAddress((state: any) => ({
        // allRecords: state.allRecords,
        // getRecords: state.getRecords,
        getRecord: state.getRecord,
        current: state.current,
        addRecord: state.addRecord,
        updateRecord: state.updateRecord,
    }));

    React.useEffect(() => {
        console.log("storeEmployeeAddress", storeEmployeeAddress.getRecord(id))
        storeEmployeeAddress.getRecord(id);
        return () => {
            form.setFieldsValue({});
        };
    }, [id]);


    React.useEffect(() => {
        if (storeEmployeeAddress.current.id !== id) {
            return;
        }
        form.setFieldsValue(storeEmployeeAddress.current);
    }, [storeEmployeeAddress.current]);

    const [stateData, setStateData] = useState(false);

    const handleCountryChange = (value: any) => {
        const stateList = countries.find(x => x.value == value)?.states || [];
        console.log(stateList)
        form.setFields([{ name: "state", value: '' }, { name: "district", value: '' }])
        if (stateList != undefined && stateList?.length > 0) {
            setStates(stateList);
            setDistricts([])
        } else {
            setStates([])
            setDistricts([])
        }
    };

    const handleStateChange = (value: any) => {
        const districtList = states.find(x => x.value === value)?.districts || [];
        form.setFields([{ name: "district", value: '' }])
        if (districtList != undefined && districtList.length > 0) {
            setDistricts(districtList);
        } else {
            setDistricts([])
        }
    }

    const onFormSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                setSaveProgress({ ...saveProgress, disableSubmit: true });
                if (isNew) {
                    const record = await storeEmployeeAddress.addRecord(values);
                    if (!isEmptyValue(record)) {
                        notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
                    }
                }
                else {
                    const record = await storeEmployeeAddress.updateRecord(id, values);
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
        <div>
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
            >
                <Row className="justify-center">
                    <Col className='w-md'>
                        <>
                            <h4 style={{ fontWeight: 'bold', margin: 10 }}>Permanent Address</h4>
                            <Form.Item name="address1" label="Address Line 1" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                            <Form.Item name="address2" label="Address Line 2" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                            <Form.Item name="address2" label="Address Line 3" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                            <Form.Item name="locationCategory" label="Location Category" rules={[{ required: true }]} style={{ fontWeight: 'bold' }}>
                                <Select style={{ textTransform: 'uppercase' }}
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                    options={locationType}
                                />
                            </Form.Item>
                            <Form.Item name="country" label="Country" rules={[{ required: true }]} style={{ fontWeight: 'bold' }}>
                                <Select style={{ textTransform: 'uppercase' }}
                                    defaultValue="Select Country"
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                    onChange={handleCountryChange}
                                    options={countries}
                                />
                            </Form.Item>
                            <Form.Item name="state" label="State" rules={[{ required: true }]} style={{ fontWeight: 'bold' }}>
                                <Select style={{ textTransform: 'uppercase' }}
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                    onChange={handleStateChange}
                                    options={states}
                                />
                            </Form.Item>
                            <Form.Item name="district" label="District" rules={[{ required: true }]} style={{ fontWeight: 'bold' }}>
                                <Select style={{ textTransform: 'uppercase' }}
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                    options={districts}
                                />
                            </Form.Item>
                            <Form.Item name="tehsil" label="Tehsil" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                            <Form.Item name="pincode" label="PIN Code" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} maxLength={6} />
                            </Form.Item>
                            <Form.Item name="mobileNumber" label="Mobile No." rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} maxLength={10} />
                            </Form.Item>
                            <Form.Item name="alternateNumber" label="Alternate Mobile No." rules={schemaRules} style={{ fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} maxLength={10} />
                            </Form.Item>
                            <Form.Item name="telephoneNumber" label="Telephone No." rules={schemaRules} style={{ fontWeight: 'bold' }}>
                                <Input style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                        </>

                        <h4 style={{ fontWeight: 'bold', margin: 10 }}>Present Address Details</h4>
                        {/* <Form.Item name="isSame" label="Same as Above." rules={schemaRules}>
                        <Checkbox
                            onChange={e => setIsSame(e.target.checked)} checked={isSame}
                        ></Checkbox>
                    </Form.Item> */}
                        <div style={{ margin: 10 }}>
                            <Checkbox
                                onChange={e => setIsSame(e.target.checked)} checked={isSame}
                            // onChange={onChange}
                            >Same as Above.</Checkbox>
                        </div>
                        <Form.Item name="address1" label="Address Line 1" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                            <Input style={{ textTransform: 'uppercase' }} />
                        </Form.Item>
                        <Form.Item name="address2" label="Address Line 2" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                            <Input style={{ textTransform: 'uppercase' }} />
                        </Form.Item>
                        <Form.Item name="address2" label="Address Line 3" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                            <Input style={{ textTransform: 'uppercase' }} />
                        </Form.Item>
                        <Form.Item name="locationCategory" label="Location Category 1" rules={[{ required: true }]} style={{ fontWeight: 'bold' }}>
                            <Select style={{ textTransform: 'uppercase' }}
                                placeholder="Select a option and change input text above"
                                allowClear
                                options={locationType}
                            />
                        </Form.Item>
                        <Form.Item name="country" label="Country" rules={[{ required: true }]} style={{ fontWeight: 'bold' }}>
                            <Select style={{ textTransform: 'uppercase' }}
                                placeholder="Select a option and change input text above"
                                allowClear
                                options={countries}
                            />
                        </Form.Item>
                        <Form.Item name="state" label="State" rules={[{ required: true }]} style={{ fontWeight: 'bold' }}>
                            <Select style={{ textTransform: 'uppercase' }}
                                placeholder="Select a option and change input text above"
                                allowClear
                                options={state}
                            />
                        </Form.Item>
                        <Form.Item name="district" label="District" rules={[{ required: true }]} style={{ fontWeight: 'bold' }}>
                            <Select style={{ textTransform: 'uppercase' }}
                                placeholder="Select a option and change input text above"
                                allowClear
                                options={district}
                            />
                        </Form.Item>
                        <Form.Item name="tehsil" label="Tehsil" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                            <Input style={{ textTransform: 'uppercase' }} />
                        </Form.Item>
                        <Form.Item name="pincode" label="PIN Code" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                            <Input style={{ textTransform: 'uppercase' }} maxLength={6} />
                        </Form.Item>

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

                    </Col>
                </Row>
            </Form>
        </div>
    )
};

export default AddressDetails;
