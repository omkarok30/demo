import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Space, Table } from 'antd';
import { todoLookUps } from '@/store/todoLookUps';

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface IPropsInterface {
  currData: [];
  onCancel: () => void;
}

const UpdateReservedSeats: React.FC = (props: IPropsInterface) => {
  const { currData, onCancel } = (props);

  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const todoData = todoLookUps?.getState().reservedCategory;

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    todoData?.forEach((todo) => {
      currData.forEach((item: any) => {
        if (item.category.toLowerCase() === todo.categoryName.toLowerCase() && item.numberOfSeats) {
          form.setFieldsValue({
            [`${todo.categoryName.toLowerCase()}`]: '',
          });
        }
      });
    });
  };

  const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Sr. No',
      dataIndex: 'id',
    },
    {
      title: 'Reserved Category Name',
      dataIndex: 'categoryName',
    }, {
      title: 'Number of seats earmarked',
      dataIndex: 'noOfSeats',
      key: 'noOfSeats',
      width: 300,
      render: (_, record) => {
        const isDisabled = !selectedRowKeys.includes(record.id);
        if (isDisabled) {
          return <Form.Item style={{ marginBottom: 0 }}
            name={`${record?.categoryName.toLowerCase()}`}
          >
            <Input disabled={isDisabled} />
          </Form.Item>;
        }
        else {
          return <Form.Item style={{ marginBottom: 0 }}
            name={`${record?.categoryName.toLowerCase()}`}
            rules={[{ message: 'Please enter number', required: true },
              () => ({
                validator(_, value) {
                  if (!value) {
                  // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject();
                  }
                  if (isNaN(value) || value < 0) {
                  // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('Please enter number greater or equal to zero');
                  }
                  return Promise.resolve();
                },
              })]}
          >
            <Input />
          </Form.Item>;
        }
      },
    },
  ];

  const handleSave = () => {
    form.validateFields()
      .then(async (values) => {
        // eslint-disable-next-line no-console
        console.log(values);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('error', e);
      });
  };

  useEffect(() => {
    if (currData) {
      todoData?.forEach((todo) => {
        currData.forEach((item: any) => {
          if (item.category.toLowerCase() === todo.categoryName.toLowerCase() && item.numberOfSeats) {
            setSelectedRowKeys(prev => ([...prev, todo.id]));
            form.setFieldsValue({
              [`${todo.categoryName.toLowerCase()}`]: item.numberOfSeats,
            });
          }
        });
      });
    }
    return () => {
      form.setFieldsValue({});
    };
  }, [currData]);

  const components = {
    body: {
      selectedRowKeys,
      onChange: onSelectChange,
    },
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Form form={form}>
      <Table
        components={components}
        rowSelection={rowSelection}
        rowKey={record => record?.id}
        bordered
        dataSource={todoData}
        columns={columns}
        pagination={false}
      />
      <Divider />
      <Space style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type='primary' onClick={handleSave}>
          Save
        </Button>
        <Button onClick={() => onCancel()}>
          Cancel
        </Button>
      </Space>
    </Form>
  );
};

export default UpdateReservedSeats;
