import { Button, Card, Col, Form, Input, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useManageLibrary } from '@/store/library/useManageLibrary';

const UpdateTitle = () => {
  const storeManageBooks = useManageLibrary((state: any) => ({
    current: state.current,
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    getRecord: state.getRecord,
  }));
  const current = storeManageBooks.current;
  const navigation = useNavigate();
  const handleNavigation = () => {
    navigation('/library/manageBooks/list');
  };
  const [title, setTitle] = useState(current.title);
  const [authorName, setAuthorName] = useState(current.author);
  const [edition, setEdition] = useState(current.edition);
  const [location, setLocation] = useState(current.location);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    handleNavigation();
  };

  useEffect(() => {
    console.log(storeManageBooks.current);
    form.setFieldsValue(storeManageBooks.current);
  }, [storeManageBooks.current]);

  return (
    <div className="layout-main-content">
      <Card title="Manage Books">
           <Form onFinish={onFinish} form={form}>
        <Row className="justify-center">
          <Col className="w-md">
            <Row style={{ marginBottom: 20 }}>
               Title <Typography.Text type="danger">*</Typography.Text>
                 <Form.Item name="title" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input />
              </Form.Item>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              Author Name <Typography.Text type="danger">*</Typography.Text>
         <Form.Item name="author" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input />
              </Form.Item>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              Edition <Typography.Text type="danger">*</Typography.Text>
            <Form.Item name="edition" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input />
              </Form.Item>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              Location
   <Form.Item name="location" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input />
              </Form.Item>
            </Row>
            <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
              <Space direction="horizontal">
                <Button htmlType='submit' type="primary">Submit</Button>
                <Button onClick={handleNavigation} type="default">Cancel</Button>
              </Space>
            </Row>
          </Col>
        </Row>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateTitle;
