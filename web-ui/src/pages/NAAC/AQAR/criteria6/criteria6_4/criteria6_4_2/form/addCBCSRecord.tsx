import React, { useState } from 'react';
import { Button, Card, Form, Input, Space, Table } from 'antd';

import type { FormInstance } from 'antd/es/form';
import { DeleteFilled } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  id: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const AddRecords: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      id: 1,
    },
  ]);

  const [count, setCount] = useState(dataSource.length);
  const [registerForm] = Form.useForm();

  const handleDelete = (id: number) => {
    const newData = dataSource.filter(item => item.id !== id);
    setDataSource(newData);
  };

  const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Year',
      dataIndex: 'academicYear',
      width: 110,
      render: (_, _record) => {
        return [<div style={{ color: 'rgba(0, 0, 0, 0.25)', padding: '4px 11px', background: '#f5f5f5', border: '1px solid #D9D9D9' }}><YearAsText value={Number(yearId)} /></div>];
      },
    }, {
      title: 'Name of the non government funding agencies/ individuals',
      dataIndex: 'nameOfFundingAgency',
      key: 'nameOfFundingAgency',
      render: (_, _record) => {
        return [
          <Form.Item style={{ marginBottom: 0 }} name={'nameOfFundingAgency'} rules={[{ message: 'Please enter Funding Agency name', required: true }]} >
            <Input />
          </Form.Item>,
        ];
      },
    }, {
      title: 'Purpose of the Grant',
      dataIndex: 'purposeOfGrant',
      key: 'purposeOfGrant',
      render: (_, _record) => {
        return [
          <Form.Item style={{ marginBottom: 0 }} name={'purposeOfGrant'} rules={[{ message: 'Please enter purpose of grant', required: true }]} >
            <Input />
          </Form.Item>,
        ];
      },
    },
    {
      title: 'Funds/ Grants received (INR in lakhs)',
      dataIndex: 'fundsReceived',
      key: 'fundsReceived',
      render: (_, _record) => {
        return [
          <Form.Item style={{ marginBottom: 0 }} name={'fundsReceived'} rules={[{ message: 'Please enter number', required: true },
            () => ({
              validator(_, value) {
                if (isNaN(value)) {
                // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject('Value has to be a number.');
                }
                return Promise.resolve();
              },
            })]} >
            <Input />
          </Form.Item>,
        ];
      },
    },
    {
      title: 'Link to Audited Statement of Accounts reflecting the receipts',
      dataIndex: 'link',
      key: 'link',
      render: (_, _record) => {
        return [
          <Form.Item style={{ marginBottom: 0 }} name={'link'} rules={[{ message: 'Please enter Link', required: true },
            () => ({
              validator(_, value) {
                if (!value) {
                // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject();
                }
                return Promise.resolve();
              },
            })]} >
            <Input />
          </Form.Item>,
        ];
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 20,
      render: (_, record: { id: number }) =>
        dataSource.length >= 1
          ? (
            <Button type='link' danger onClick={() => handleDelete(record.id)} icon={<DeleteFilled />} title="Delete row" />
            )
          : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      id: count + 1,
    };
    setDataSource([...dataSource, newData]);
    setCount(prev => prev + 1);
  };

  const handleSave = () => {
    // const newData = [...dataSource];
    // const index = newData.findIndex(item => row.key === item.key);
    // const item = newData[index];
    // newData.splice(index, 1, {
    //   ...item,
    //   ...row,
    // });
    // setDataSource(newData);
    registerForm.validateFields()
      .then(async (values) => {
        // eslint-disable-next-line no-console
        console.log(values);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('error', e);
      });
  };

  const components = {
    body: {
      row: EditableRow,
    },
  };
  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        actions={[
          <Space>
            <Button type='primary' title='Save' onClick={() => handleSave()}>Save</Button>
            <Button title='Back' onClick={() => navigate(-1)}>Back</Button>
          </Space>,
        ]}
      >
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <Button onClick={handleAdd} type="primary" style={{ marginTop: 16, marginBottom: 16 }}>
          Add
        </Button>
      </Card>
    </div>
  );
};

export default AddRecords;
