import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Tabs, notification } from 'antd';
import TransferenceCertificateList from './transferenceCertificate/list';
import CancelledAdmissionList from './cancelledAdmission/list';



const TransferenceCertificateTab = () => {
  const { id } = useParams();
  const isNew = id === 'new';
//   const { state } = useLocation();
//   const { activeTab } = state;
  const [isactiveTab, setActiveTab] = React.useState('passout_student');
  const [headerLabel, setHeaderLabel] = React.useState('By Passout /Cancellation Year');


//   React.useEffect(() => {
//     if (activeTab) {
//       setActiveTab(activeTab);
//     }
//     else {
//       setActiveTab('basic_details');
//     }
   
//   }, [id]);




  const tabPages = [
    { label: 'Passout Student', key: 'passout_student', children: <TransferenceCertificateList /> },
    { label: 'Cancelled Admission', key: 'cancelled_admission', children: <CancelledAdmissionList /> },
  ];

  const onChange = (key: string) => {
    console.log(key);
    if(key==='passout_student'){
        setHeaderLabel ('By Passout /Cancellation Year')
    }else{
        setHeaderLabel ('View by Passout /Cancellation Year')
    }
    setActiveTab(key);
  };

  return (
    <div className='layout-main-content'>
    
     
        <Card
         title={headerLabel}
          bordered={false}>
          <Tabs items={tabPages} tabPosition={'top'}   type="card" onChange={onChange} activeKey={isactiveTab} />
        </Card>
    </div>);
};

export default TransferenceCertificateTab;

