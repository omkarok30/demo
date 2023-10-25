import React, { useState } from 'react';
import { Button, Card, Form, Input, Select, Space, Table } from 'antd';

import { DeleteFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FormInstance } from 'antd/es/form';
import { useCustomStudentInfoHook } from '../renderers';

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

const InputFieldForm = ({ inputName }) => {
  return (
    <Form.Item style={{ marginBottom: 0 }} name={inputName} rules={[{ message: 'Please enter value' },
      () => ({
        validator(_, value) {
          if (!value) {
          // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject();
          }
          return Promise.resolve();
        },
      })]} >
      <Input width={'100%'} />
    </Form.Item>
  );
};

const AddRecords: React.FC = () => {
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();
  const {
    allRecords, studentProgram, setValue,
  } = useCustomStudentInfoHook();

  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      id: 1,
    },
  ]);

  const [count, setCount] = useState(dataSource.length);

  const handleDelete = (id: number) => {
    const newData = dataSource.filter(item => item.id !== id);
    setDataSource(newData);
  };

  const handleChange = (value: string, id: number) => {
    setValue(prev => ({ ...prev, rowId: id, progValue: value }));
  };

  const columns: (ColumnTypes[any] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Sr. No.',
      dataIndex: 'id',
    },
    {
      dataIndex: 'studentName',
      key: 'studentName',
      title: 'Registration number/roll number for the exam',
      render: (_, _record) => {
        return [<InputFieldForm inputName={'studentName'} />];
      },
    },
    {
      title: 'Names of students selected/ qualified',
      dataIndex: 'studentInfo$programId',
      key: 'studentInfo$programId',
      render: (_, record: { id: number }) => {
        return <Select
          placeholder="Select Student"
          style={{ width: '100%' }}
          onChange={value => handleChange(value, record?.id)}
          options={allRecords.map((student: any) => {
            return {
              value: student.key,
              label: `${student.firstName} ${student.middleName} ${student.lastName}`,
            };
          },
          )}
        />;
      },
    },
    {
      title: 'Names of students selected/qualified',
      dataIndex: 'students',
      children: [
        {
          title: 'NET',
          dataIndex: 'net',
          key: 'net',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'net'} />];
          },
        },
        {
          title: 'SLET',
          dataIndex: 'slet',
          key: 'slet',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'slet'} />];
          },
        },
        {
          title: 'GATE',
          dataIndex: 'gate',
          key: 'gate',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'gate'} />];
          },
        },
        {
          title: 'GMAT',
          dataIndex: 'gmat',
          key: 'gmat',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'gmat'} />];
          },
        },
        {
          title: 'CAT',
          dataIndex: 'cat',
          key: 'cat',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'cat'} />];
          },
        },
        {
          title: 'GRE',
          dataIndex: 'gre',
          key: 'gre',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'gre'} />];
          },
        },
        {
          title: 'JAM',
          dataIndex: 'jam',
          key: 'jam',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'jam'} />];
          },
        },
        {
          title: 'IELTS',
          dataIndex: 'ielts',
          key: 'ielts',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'ielts'} />];
          },
        },
        {
          title: 'TOEFL',
          dataIndex: 'toefl',
          key: 'toefl',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'toefl'} />];
          },
        },
        {
          title: 'Civil Services',
          dataIndex: 'civilservices',
          key: 'civilservices',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'civilservices'} />];
          },
        },
        {
          title: 'State government examinations',
          dataIndex: 'stategovexam',
          key: 'stategovexam',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'stategovexam'} />];
          },
        },
        {
          title: 'Other examinations conducted by the State / Central Government Agencies (Specify)',
          dataIndex: 'other',
          key: 'other',
          render: (_, _record) => {
            return [<InputFieldForm inputName={'other'} />];
          },
        },
      ],
    },
    {
      title: 'Action',
      dataIndex: 'action',
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

  // const handleSave = (row: DataType) => {
  //   const newData = [...dataSource];
  //   const index = newData.findIndex(item => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, {
  //     ...item,
  //     ...row,
  //   });
  // };

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
            <Button type='primary' title='Save'>Save</Button>
            <Button title='Back' onClick={() => navigate(-1)}>Back</Button>
          </Space>,
        ]}
      >
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
          scroll={{ x: 1000 }}
        />
        <Button onClick={handleAdd} size='small' type="primary" style={{ marginBottom: 16, marginTop: 16 }}>
          Add
        </Button>
      </Card>
    </div>
  );
};

export default AddRecords;
