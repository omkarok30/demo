import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, Upload, Checkbox, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeRelievingDetails from '@/models/Employee/EmployeeRelievingDetails';
import { useEmployeeRelievingDetails } from '@/store/employee/useEmployeeRelievingDetails';

import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { todoLookUps } from '@/store/todoLookUps';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
const employmentStatus = todoLookUps.getState().employmentStatus;
import { UploadFileStatus } from 'antd/lib/upload/interface';
import { useGlobalState } from '@/store/global';
const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
};
const Transfer = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const global = useGlobalState((state: any) => state.default);
   
    const getFile = (e: UploadFileStatus) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }
        //  return e && e.fileList;
    };


    return (
        <div>
            <Form form={form} layout="vertical" >
                <Form.Item name="Termination/Removal Date" label="Date of Transfer Order" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                </Form.Item>
                <Form.Item name="Reason for Termination/Removal" label="Relieving Date" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold', marginTop: 20 }}>
                    <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                </Form.Item>
                <Form.Item name="Description" label="Description"  style={{ flex: 1, marginRight: 10, fontWeight: 'bold', marginTop: 20 }}>
                    <Input.TextArea style={{ textTransform: 'uppercase' }} rows={3} />
                </Form.Item>
                <Form.Item name="Upload Document" label="Upload Document" getValueFromEvent={getFile} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Upload>
                        <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                </Form.Item>
                <h4>"Once the information is submitted, it cannot be updated"</h4>
                <div style={{ margin: 10 }}>
                    <Checkbox
                    // onChange={e => setIsSame(e.target.checked)} checked={isSame}
                    // onChange={onChange}
                    ><h4>I confirm to submit the above information.</h4></Checkbox>
                </div>
            </Form>
        </div>
    );
};

export default Transfer;
