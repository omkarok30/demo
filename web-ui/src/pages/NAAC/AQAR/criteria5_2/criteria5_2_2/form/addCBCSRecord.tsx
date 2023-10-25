import React, { useState } from 'react';
import { Button, Card, Form, Input, Select, Space, Table } from 'antd';

import { DeleteFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCustomStudentInfoHook } from '../renderers';

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  id: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const AddRecords: React.FC = () => {
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

  const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Sr.No', dataIndex: 'id', width: 20,
    },
    {
      title: 'Name of student enrolling into higher education*',
      dataIndex: 'studentName',
      width: '25%',
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
      title: 'Program graduated from',
      dataIndex: 'studentInfo$programId',
      width: '25%',
      render: (_, record: { id: number }) => {
        const row = studentProgram.filter((list: any) => list.id === record.id)[0];
        return (row?.id && row?.id === record?.id) ? <Input disabled value={row?.progName} /> : <Input disabled />;
      },
    },
    {
      title: 'Name of institution joined',
      dataIndex: 'nameOfInstitution',
      key: 'nameOfInstitution',
      width: '25%',
      render: (_, _record) => {
        return [
          <Form.Item style={{ marginBottom: 0 }} name={'nameOfInstitution'} rules={[{ message: 'Please enter name' },
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
      title: 'Name of programme admitted to',
      dataIndex: 'nameOfProgrammeAdmitted',
      key: 'nameOfProgrammeAdmitted',
      width: '15%',
      render: (_, _record) => {
        return [<Form.Item style={{ marginBottom: 0 }} name={'nameOfProgrammeAdmitted'} rules={[{ message: 'Please enter number' },
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
        </Form.Item>];
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

  // const handleSave = (row: DataType) => {
  //   const newData = [...dataSource];
  //   const index = newData.findIndex(item => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, {
  //     ...item,
  //     ...row,
  //   });
  // };

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
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
        <Button onClick={handleAdd} size='small' type="primary" style={{ marginBottom: 16 }}>
          Add
        </Button>
      </Card>
    </div>
  );
};

export default AddRecords;
