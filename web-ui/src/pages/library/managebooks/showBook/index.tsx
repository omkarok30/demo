import { Button, Card, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import { useNavigate } from 'react-router-dom';
import { useManageLibrary } from '@/store/library/useManageLibrary';
import { todoLookUps } from '@/store/todoLookUps';
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';

const ShowBook = () => {
  const storeManageBooks = useManageLibrary((state: any) => ({
    current: state.current,
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    getRecord: state.getRecord,
  }));

  const storeAcademicDepartment = useAcademicDepartment((state: any) => ({
    asDepartmentOptions: state.asDepartmentOptions,

    allDepartments: state.comboByName,
  }),
  );

  const book_type = todoLookUps.getState().book_type;
  const source = todoLookUps.getState().source;
  const current = storeManageBooks.current;
  const [readOnly, setReadOnly] = useState(true);
  useEffect(() => {
    if (readOnly) {
      storeAcademicDepartment.asDepartmentOptions();
    }
  }, [readOnly]);

  const navigate = useNavigate();
  const handleActionClick = ({ action, record }) => {
    if (action === 'update') {
      navigate('/library/manageBooks/viewDetails');
    }
    else {
      navigate('/library/manageBooks/viewDetails');
    }
  };
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(storeManageBooks.current);
    form.setFieldsValue(storeManageBooks.current);
  }, [storeManageBooks.current]);
  const onFinish = (values: any) => {
    navigate('/library/manageBooks/viewDetails');
  };

  return (
    <div className="layout-main-content">
      <Card
        title="Book Details"
        key={1}
        extra={
          <Button
            type="primary"
            style={{ backgroundColor: 'green' }}>
            Print
          </Button>
        }>
             <Form onFinish={onFinish} form={form}>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Barcode
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>

              <Barcode value={current.accessionNo} />

          </Col>

        </Row>

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Book Type <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
               <Form.Item name="bookType" style={{ width: '100%' }} rules={[{ required: true }]}>
                <Select style={{ width: '100%' }} disabled options={book_type}/>
              </Form.Item>
          </Col>

          <Col
            xs={12}
            xl={3}
            span={3}>
            Source <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
               <Form.Item name="source" style={{ width: '100%' }} rules={[{ required: true }]}>
                <Select style={{ width: '100%' }} disabled options={source}/>
              </Form.Item>
          </Col>

        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Accession Number <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
               <Form.Item name="accessionNo" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled />
              </Form.Item>
          </Col>

 <Col
            xs={12}
            xl={3}
            span={3}>
            Accession Date <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
               <Form.Item name="accessionDate" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} type='date' />
              </Form.Item>

          </Col>

        </Row>

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Title <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
               <Form.Item name="title" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>

          <Col
            xs={12}
            xl={3}
            span={3}>
            Department <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
                 <Form.Item name="department" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>

        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Title (other than English)

          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
                    <Form.Item name="otherLangTitle" style={{ width: '100%' }} rules={[{ required: false }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>

<Col
            xs={12}
            xl={3}
            span={3}>
            Class No. <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
                   <Form.Item name="classNo" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>

        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Author Name
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
                  <Form.Item name="author" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>
          </Col>

<Col
            xs={12}
            xl={3}
            span={3}>
            Book No. <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
                 <Form.Item name="bookNo" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>

        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Edition
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
                  <Form.Item name="edition" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>
<Col
            xs={12}
            xl={3}
            span={3}>
            Material Type <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
                       <Form.Item name="materialStatus" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>

        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Volume
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
               <Form.Item name="volume" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>
          </Col>
<Col
            xs={12}
            xl={3}
            span={3}>
            Language Code <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
              <Form.Item name="langCode" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>

        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Name of Publication
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
               <Form.Item name="namePublication" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>
<Col
            xs={12}
            xl={3}
            span={3}>
            Material Name <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
               <Form.Item name="materialName" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>

        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Place of Publication
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
               <Form.Item name="placePublication" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>
<Col
            xs={12}
            xl={3}
            span={3}>
            Location
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
              <Form.Item name="location" style={{ width: '100%' }} rules={[{ required: false }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>

        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Year of Publication
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
              <Form.Item name="yearPublication" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>
<Col
            xs={12}
            xl={3}
            span={3}>
            Cupboard
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
                <Form.Item name="cupboard" style={{ width: '100%' }} rules={[{ required: false }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>

        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Series
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
                <Form.Item name="series" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>
   <Col
            xs={12}
            xl={3}
            span={3}>
            Shelf Number
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
                  <Form.Item name="shelfNumber" style={{ width: '100%' }} rules={[{ required: false }]}>
              <Input disabled={readOnly} />
              </Form.Item>
          </Col>

        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Pages
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
                    <Form.Item name="pages" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>
            <Col
            xs={12}
            xl={3}
            span={3}>
            Received Date <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
              <Form.Item name="receivedDate" style={{ width: '100%' }} rules={[{ required: true }]}>
              <Input disabled={readOnly} />
              </Form.Item>

          </Col>
        </Row>

        <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            <Space direction="horizontal">
              {readOnly
                ? <> <Button
                title="Submit"
                onClick={() => setReadOnly(false)}
                type="primary">
                Update
              </Button>

              <Button
                title="Back"
                onClick={() => handleActionClick({ action: 'back', current })}
                type="default">
                Back
              </Button>   </>
                : null
              }

 {!readOnly
              && <>
               <Form.Item>
                  <Button
                  title="Submit"
                  htmlType='submit'
                  type="primary">
                    Submit
                  </Button>
              </Form.Item>
              <Form.Item>
              <Button
                title="Back"
                onClick={() => handleActionClick({ action: 'back', current })}
                type="default">
                Back
              </Button>
              </Form.Item>
              </>
}
            </Space>
          </Col>
        </Row>
        </Form>
      </Card>
    </div>
  );
};

export default ShowBook;
