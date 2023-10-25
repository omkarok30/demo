import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Tabs, notification } from 'antd';
import ActiveManageCoursesList from './manageCourses/ActiveCourses/list';
import InactiveManageCoursesList from './manageCourses/InactiveCourses/list';




const ManageCoursesTab = () => {

  const [isactiveTab, setActiveTab] = React.useState('active_courses');
  const [headerLabel, setHeaderLabel] = React.useState('Manage Courses');
  const navigate = useNavigate();

  const tabPages = [
    { label: 'Active Courses', key: 'active_courses', children: <ActiveManageCoursesList /> },
    { label: 'Inactive Courses', key: 'inactive_courses', children: <InactiveManageCoursesList /> },
  ];

  const onChange = (key: string) => {
    console.log(key);
    // if(key==='passout_student'){
    //     setHeaderLabel ('By Passout /Cancellation Year')
    // }else{
    //     setHeaderLabel ('View by Passout /Cancellation Year')
    // }
    setActiveTab(key);
  };
  const navigateToNewForm = () => {
    navigate("../edit/new");
  };
  return (
    <div className='layout-main-content'>
     
     
        <Card
         title={headerLabel}
          bordered={false}
          extra={ <Button type="primary" onClick={navigateToNewForm}>
          Add Course
        </Button>} >
          <Tabs items={tabPages} tabPosition={'top'}   type="card" onChange={onChange} activeKey={isactiveTab} />
        </Card>
    </div>);
};

export default ManageCoursesTab;

