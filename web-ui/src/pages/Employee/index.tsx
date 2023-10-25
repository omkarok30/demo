import React, { useState, useEffect } from "react";
import { Card, Col, Row, Form, Tooltip, Input, Checkbox, Button, Tabs } from 'antd';

import IconSvg from '@/components/IconSvg';
import ALink from '@/components/ALink';
import type { TabsProps } from 'antd';
import style from './index.module.less';
const ChartColProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 24,
  xl: 24,
};

function App() {
  const [employeeData, setEmployeeData] = useState({
    empStatus: "ACTIVE",
    empFirstName: "SURAJ",
    empMiddleName: "",
    empLastName: "VARAPE",
    empMobileNo: "9856689565",
    empAltMobileNo: "",
    empPersonalEmail: "sima@rsensetech.com",
    empOfficialEmail: ""
  });

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Basic Details`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: '2',
      label: `Personal Details`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `Address`,
      children: `Content of Tab Pane 3`,
    },
    {
      key: '4',
      label: `Identify Image`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: '5',
      label: `Positions`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '6',
      label: `Job History`,
      children: `Content of Tab Pane 3`,
    },
  ];

  let TaskList =
    [
      {
        tab: 'Basic Details',
      },
      {
        tab: 'Personal Details',
      },
      {
        tab: 'Address',
      }, {
        tab: 'Identity Image',
      },
      {
        tab: 'Positions',
      },
      {
        tab: 'Job History',
      },
      {
        tab: 'Qualifications Details',
      }, {
        tab: 'Technical Skills',
      }, {
        tab: 'Personal Details',
      },
      {
        tab: 'Achievement',
      },
      {
        tab: 'Experience',
      }, {
        tab: 'Payment Modes',
      }, {
        tab: 'Details of Activities',
      },
      {
        tab: 'Benefits',
      },
      {
        tab: 'Emergency'
      },
      {
        tab: 'Policy Details',
      }, {
        tab: 'Relieving Details',
      },
      {
        tab: 'Employee Documents'
      },
      {
        tab: 'Deputations',
      }
    ];



  const [myColor, setMyColor] = useState('#3A3093');
  const [myColor1, setMyColor1] = useState('#FFFFFF');

  const [activeIndex, setActiveIndex] = useState('-1');

  useEffect(() => {
    setActiveIndex('0')
  }, []);

  return (
    <div>
      {/* <Tabs defaultActiveKey="1"  type="card" items={items} onChange={onChange} /> */}
      {/* <Button type="primary" htmlType="submit" style={{ backgroundColor: myColor, color: myColor1 }} onClick={() => {
        setMyColor('#E0E0E0'),
          setMyColor1('#000')
      }}>
        Basic Details
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Personal Details
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Address
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Identity Image
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Positions
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Job History
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Qualifications Details
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Technical Skills
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Personal Details
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Achievement
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Experience
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Payment Modes
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Details of Activities
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Benefits
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Emergency
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Policy Details
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Relieving Details
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Employee Documents
      </Button>
      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} >
        Deputations
      </Button> */}
      {/* {TaskList.map((item, index) => {

        return (<Button type="primary" htmlType="submit" style={{ backgroundColor: activeIndex === index ? '#DBA801' : '#1F588D', marginRight: 10, marginLeft: 10 }} >


          {item.tab}
          )

        </Button>
     })} */}
      {TaskList.map((item, index) => {
        return (<Button htmlType="submit" style={{ backgroundColor: activeIndex === index ? '#3A3093' : '#FFFF', color: activeIndex === index ? '#FFF' : '#000', margin: 2,borderRadius:2 }}
          onClick={() => {
            setActiveIndex(index)
          }}>
          {item.tab}
        </Button>
        )
      })}
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        //style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off" className={style.main}
      >

        <Form.Item
          label="Employment Status"
          name="username"
          className={style.mainForm}
          style={{ marginBottom: "10px" }}
          rules={[{ required: false, message: 'Please input Employment Status!' }]}
        >
          <Input defaultValue={employeeData.empStatus}
            placeholder="Status"
            className={style.mainInput}
            onChange={e => setEmployeeData({ ...employeeData, empStatus: e.target.value })} />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="fName"
          style={{ paddingLeft: 143, marginBottom: "10px" }}
          className={style.mainForm}
          rules={[{ required: true, message: 'Please input your First Name!' }]}
        >
          <Input defaultValue={employeeData.empFirstName}
            placeholder="First Name"
            className={style.mainInput}
            onChange={e => setEmployeeData({ ...employeeData, empFirstName: e.target.value })} />
        </Form.Item>
        <Form.Item
          label="Middle Name"
          name="mName"
          style={{ paddingLeft: 137, marginBottom: "10px" }}
          className={style.mainForm}
          rules={[{ required: false, message: 'Please input your Middle Name!' }]}
        >
          <Input defaultValue={employeeData.empMiddleName}
            placeholder=""
            className={style.mainInput}
            onChange={e => setEmployeeData({ ...employeeData, empMiddleName: e.target.value })} />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lName"
          style={{ paddingLeft: 145, marginBottom: "10px" }}
          className={style.mainForm}
          rules={[{ required: true, message: 'Please input your Last Name!' }]}
        >
          <Input defaultValue={employeeData.empLastName}
            placeholder="Last Name"
            className={style.mainInput}
            onChange={e => setEmployeeData({ ...employeeData, empLastName: e.target.value })} />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobile"
          style={{ paddingLeft: 110, marginBottom: "10px" }}
          className={style.mainForm}
          rules={[{ required: true, message: 'Please input your Mobile Number!' }]}
        >
          <Input defaultValue={employeeData.empMobileNo}
            placeholder="Mobile Number"
            className={style.mainInput}
            onChange={e => setEmployeeData({ ...employeeData, empMobileNo: e.target.value })} />
        </Form.Item>
        <Form.Item
          label="ALTERNATE MOBILE NUMBER"
          name="altMobile"
          style={{ paddingLeft: 30, marginBottom: "10px" }}
          className={style.mainForm}
          rules={[{ required: false, message: 'Please input your Alternate Mobile Number!' }]}
        >
          <Input defaultValue={employeeData.empAltMobileNo}
            placeholder="Alternate Mobile Number"
            className={style.mainInput}
            onChange={e => setEmployeeData({ ...employeeData, empAltMobileNo: e.target.value })} />
        </Form.Item>
        <Form.Item
          label="Personal Email Id"
          name="personalEmail"
          style={{ marginBottom: "10px" }}
          className={style.mainForm}
          rules={[{ required: true, message: 'Please input your Personal Email Id!' }]}
        >
          <Input defaultValue={employeeData.empPersonalEmail}
            placeholder="Personal Email Id"
            className={style.mainInput}
            onChange={e => setEmployeeData({ ...employeeData, empPersonalEmail: e.target.value })} />
        </Form.Item>
        <Form.Item
          label="Official Email Id"
          name="officialEmail"
          style={{ paddingLeft: 120, marginBottom: "10px" }}
          className={style.mainForm}
          rules={[{ required: false, message: 'Please input your Official Email Id!' }]}
        >
          <Input defaultValue={employeeData.empOfficialEmail}
            placeholder="E-MAIL ID"
            className={style.mainInput}
            onChange={e => setEmployeeData({ ...employeeData, empOfficialEmail: e.target.value })} />
        </Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ marginLeft: 100, marginTop: 30 }}>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3A3093' }} onClick={() => {
            console.log("printempdata", JSON.stringify(employeeData))
          }}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
}

export default App;



