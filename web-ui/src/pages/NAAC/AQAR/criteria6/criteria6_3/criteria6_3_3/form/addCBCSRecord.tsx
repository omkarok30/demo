import React, { useState } from 'react';
import { Button, Card, DatePicker, Form, Input, Space, Table } from 'antd';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import type { FormInstance } from 'antd/es/form';
import { DeleteFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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

const dateFormat = 'DD/MM/YYYY';
const { RangePicker } = DatePicker;
dayjs.extend(weekday);
dayjs.extend(localeData);

const rangeConfig = {
  rules: [{ type: 'array' as const, required: true, message: 'Please select date!' }],
};

const AddRecords: React.FC = () => {
  const navigate = useNavigate();
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
      title: 'Dates (from-to) (DD-MM-YYYY)',
      dataIndex: 'dateFromTo',
      width: 250,
      render: (_, _record) => {
        return [
          <Form.Item style={{ marginBottom: 0 }} name="datePicker" {...rangeConfig}>
            <RangePicker
              format={dateFormat}
            />
          </Form.Item>,
        ];
      },
    }, {
      title: 'Title of the professional development program organised for teaching staff',
      dataIndex: 'professionalDevelopmentTitle',
      key: 'professionalDevelopmentTitle',
      render: (_, _record) => {
        return [

            <Form.Item style={{ marginBottom: 0 }} name={'professionalDevelopmentTitle'} rules={[{ message: 'Please enter Professional title', required: true },
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
    }, {
      title: 'Title of the administrative training program organised for non-teaching staff',
      dataIndex: 'administrativeTrainingTitle',
      key: 'administrativeTrainingTitle',
      render: (_, _record) => {
        return [

            <Form.Item style={{ marginBottom: 0 }} name={'administrativeTrainingTitle'} rules={[{ message: 'Please enter administrative title', required: true },
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
      title: 'No. of participants',
      dataIndex: 'numberOfParticipant',
      key: 'numberOfParticipant',
      render: (_, _record) => {
        return [

            <Form.Item style={{ marginBottom: 0 }} name={'numberOfParticipant'} rules={[{ message: 'Please enter number', required: true },
              () => ({
                validator(_, value) {
                  if (!value) {
                  // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject();
                  }
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
