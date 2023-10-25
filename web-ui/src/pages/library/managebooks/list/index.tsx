import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'rc-table/lib/interface';

import { useNavigate } from 'react-router-dom';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useSettings } from '@/store/settings/useSettings';
import { useManageLibrary } from '@/store/library/useManageLibrary';
import { todoLookUps } from '@/store/todoLookUps';
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';

const index = () => {
  const [showAssignCard, setShowAssignCard] = useState(true);

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const storeManageBooks = useManageLibrary((state: any) => ({
    current: state.current,
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    getRecord: state.getRecord,
  }));

  const book_type = todoLookUps.getState().book_type;
  const source = todoLookUps.getState().source;
  const current = storeManageBooks.current;

  const storeAcademicDepartment = useAcademicDepartment((state: any) => ({
    asDepartmentOptions: state.asDepartmentOptions,

    allDepartments: state.comboByName,
  }),
  );

  useEffect(() => {
    storeManageBooks.getRecords();
    storeAcademicDepartment.asDepartmentOptions();
  }, []);
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    setAllBooks(storeManageBooks.allRecords.filter(x => x.bookType == 'regular'));
  }, [storeManageBooks.allRecords]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const newList = storeManageBooks.allRecords.filter((x) => {
      if (x.title.toLowerCase().includes(searchText.toLowerCase()) || x.author.toLowerCase().includes(searchText.toLowerCase())) {
        return x;
      }
    });
    setAllBooks(newList);
  }, [searchText]);

  const handleActionClick = ({ action, record }) => {
    storeManageBooks.getRecord(record.id);
    if (action === 'view') {
      navigate('/library/manageBooks/viewDetails');
    }
    if (action === 'update') {
      navigate('/library/manageBooks/updateTitle');
    }
  };

  const columns: ColumnsType<any> = useMemo(() => {
    const cols: any = [];
    cols.push({
      dataIndex: '',
      title: 'Sr.No',
      render: (_, record, index) => [
        <span>{index + 1}</span>,
      ],
    });
    cols.push({
      dataIndex: 'title',
      title: 'Title',
    });
    cols.push({
      dataIndex: 'author',
      title: 'Author',
    });
    cols.push({
      dataIndex: 'edition',
      title: 'Edition',
    });
    cols.push({
      dataIndex: 'location',
      title: 'Location',
    });
    cols.push({
      dataIndex: 'numberOfBooks',
      title: 'No. of Books',
    });
    cols.push({
      dataIndex: '',
      title: 'Action',
      render: (_, record) => [
        <Space>
          <Button
            type="primary"
            onClick={() => handleActionClick({ action: 'update', record })}>
            Update
          </Button>
          <Button
            type="primary"
            onClick={() => handleActionClick({ action: 'view', record })}>
            View Details
          </Button>
        </Space>,
      ],
    });

    return cols;
  }, [settings]);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {

  };

  const onReset = () => {
    form.resetFields();
  };
  const handleChange = (value: string) => {
    const newList = storeManageBooks.allRecords.filter(x => x.bookType.includes(value));
    setAllBooks(newList);
  };

  return (
    <div className="layout-main-content">
      <Card
        title="  Add Book"
        extra={
          <>
            <Button
              type="text"
              onClick={() => setShowAssignCard(!showAssignCard)}
              icon={showAssignCard
                ? (
           <MinusOutlined/>
                  )
                : (
          <PlusOutlined/>
                  )}>
            </Button>
          </>
        }>
        {showAssignCard
          ? (
         <Form onFinish={onFinish} form={form}>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
              style={{ marginBottom: 20 }}>

              <Col
                xs={12}
                xl={3}
                span={12}>
                Book Type<Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={12}>
                         <Form.Item
        name="book_type"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >

              <Select options={book_type} />
</Form.Item>
              </Col>

              <Col
                xs={12}
                xl={3}
                span={3}>
                Source<Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
                  <Form.Item
        name="source"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >
                <Select style={{ width: '100%' }} options={source} />
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
                Quantity<Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
    <Form.Item
        name="quantity"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >
                <Input type='number' />
                </Form.Item>
              </Col>

              <Col
                xs={12}
                xl={3}
                span={3}>
                Accession Date
             <Typography.Text type="danger">*</Typography.Text>
              </Col>

              <Col
                xs={12}
                xl={9}
                span={9}>
                                   <Form.Item
        name="accession_date"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >
                <Input type='date' />
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
                Department<Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
                <Form.Item
        name="department"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >  <Select style={{ width: '100%' }} options={storeAcademicDepartment.allDepartments}/>
      </Form.Item>
              </Col>

               <Col
                xs={12}
                xl={3}
                span={3}>
                Title<Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
  <Form.Item
        name="title"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >
                <Input />
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
                Class No.<Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
                <Form.Item
        name="class_no"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >   <Input type='number'/></Form.Item>
              </Col>

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
<Form.Item
        name="other_title"
style={{ width: '100%' }}

        rules={[
          {
            required: false,
          },
        ]}
      >
                <Input /></Form.Item>
              </Col>

            </Row>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
              style={{ marginBottom: 20 }}>

              <Col
                xs={12}
                xl={3}
                span={3}>
                Book No.<Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
                <Form.Item
        name="book_no"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      > <Input /></Form.Item>
              </Col>

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
      <Form.Item
        name="author_name"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >
                <Input />
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
                Material Type<Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
                   <Form.Item
        name="material_type"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >
                <Input />
                </Form.Item>
              </Col>
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

                 <Form.Item
        name="edition"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >  <Input type='number' /></Form.Item>
              </Col>
            </Row>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
              style={{ marginBottom: 20 }}>

              <Col
                xs={12}
                xl={3}
                span={3}>
                Language Code<Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
         <Form.Item
        name="lang_code"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >       <Input /></Form.Item>
              </Col>
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
    <Form.Item
        name="volume"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >
                <Input />
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
                Material Name<Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>

    <Form.Item
        name="material_name"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >    <Input /></Form.Item>
              </Col>

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
<Form.Item
        name="publication_name"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >
                <Input />
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
                Location
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
            <Form.Item
        name="location"
style={{ width: '100%' }}

        rules={[
          {
            required: false,
          },
        ]}
      >     <Input /></Form.Item>
              </Col>

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
   <Form.Item
        name="publication_place"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >
                <Input />
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
                Cupboard
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
                   <Form.Item
        name="cupboard"
style={{ width: '100%' }}

        rules={[
          {
            required: false,
          },
        ]}
      >
                <Input />
                </Form.Item>
              </Col>

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
<Form.Item
        name="publication_year"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >
                <Input type='number' />
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
                Shelf Number
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
              <Form.Item
        name="shelf_no"
style={{ width: '100%' }}

        rules={[
          {
            required: false,
          },
        ]}
      >  <Input type='number'/></Form.Item>
              </Col>

                <Col
                xs={12}
                xl={3}
                span={3}>
                Series

              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
<Form.Item
        name="series"
style={{ width: '100%' }}

        rules={[
          {
            required: false,
          },
        ]}
      >
                <Input />
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
                Received Date<Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
             <Form.Item
        name="received_date"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >  <Input type='date' /></Form.Item>
              </Col>

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
 <Form.Item
        name="pages"
style={{ width: '100%' }}

        rules={[
          {
            required: true,
          },
        ]}
      >
                <Input type='number' /></Form.Item>
              </Col>

            </Row>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
              style={{ marginBottom: 20 }}>

            </Row>
            <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
              <Col
                xs={12}
                xl={3}
                span={3}>
                <Space direction="horizontal">
                  <Button
                   htmlType="submit"
                    title="Submit"
                    type="primary">
                    Submit
                  </Button>
                  <Button
                   onClick={onReset}
                    title="Reset"
                    type="default">
                    Reset
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
            )
          : (
          <></>
            )}
      </Card>
      <Divider />

      <Row className="justify-center">
        <Space direction="horizontal">
          <Col>Search Book:</Col>
          <Col>

            <Input value={searchText} onChange={e => setSearchText(e.target.value)} />
          </Col>
          <Col>
            <Button type="primary" onClick={() => { location.reload(); }}>Refresh</Button>
          </Col>
        </Space>
      </Row>

      <Divider />
      <Card title="Book Information">
        <>
        <Row style={{ justifyContent: 'space-between' }}>
          <Typography.Text>Total Books: <Button type='link'>{allBooks.length}</Button> </Typography.Text>
 <Typography.Text>Select Book Type : <Select style={{ width: '100%' }} defaultValue="regular" onChange={handleChange} options={book_type} /> </Typography.Text>
        </Row>
        <Table
          columns={columns}
          dataSource={allBooks}
        />
        </>
      </Card>
    </div>
  );
};

export default index;
