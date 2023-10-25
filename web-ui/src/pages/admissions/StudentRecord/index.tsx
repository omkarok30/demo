import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Descriptions, Divider, Row, Tabs } from 'antd';

import BasicDetails from './BasicDetails/form';
import PersonalDetails from './PersonalDetails/form';
import EducationsDetails from './EducationDetails/list';
import BankDetails from './BankingDetails/list';

import AdmissionDetails from './AdmissionDetails/form';
import Beneficiary from './BeneficiaryDetails/index';
import StudentDocuments from './StudentDocuments/list';
import ContactDetails from './ContactDetails/list';
import CocurricularActivity from './CoCurricularActivity';
import AddressDetailsForm from './AddressDetails/form';
import ExtraCurricularActivities from './ExtraCurricularActivity';
import IssuedDocuments from './IssuedDocuments/list';
import OverallResult from './OverallResult/list';
import IdentityDocs from './IdentityDocs';

import { useBasicDetails } from '@/store/admissions/useBasicDetails';
import { useSettings } from '@/store/settings/useSettings';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';
const tabPages = [
  { label: 'Basic Details', key: 'basic-details', children: <BasicDetails /> },
  {
    label: 'Admission Details',
    key: 'admission-details',
    children: <AdmissionDetails />,
  },
  {
    label: 'Personal Details',
    key: 'personal-details',
    children: <PersonalDetails />,
  },
  {
    label: 'Beneficiary Details',
    key: 'beneficiary-details',
    children: <Beneficiary />,
  },
  {
    label: 'Education Details',
    key: 'education-details',
    children: <EducationsDetails />,
  },
  {
    label: 'Identity Docs',
    key: 'identity-documents',
    children: <IdentityDocs />,
  },

  { label: 'Address', key: 'address', children: <AddressDetailsForm /> },

  {
    label: 'Contact Details',
    key: 'contact-details',
    children: <ContactDetails />,
  },
  { label: 'Bank Details', key: 'bank-details', children: <BankDetails /> },
  {
    label: 'Co Curricular Activities',
    key: 'curricular-activities',
    children: <CocurricularActivity />,
  },
  {
    label: 'Extra Curricular Activities',
    key: 'extra-activities',
    children: <ExtraCurricularActivities />,
  },
  {
    label: 'Student Documents',
    key: 'student-documents',
    children: <StudentDocuments />,
  },

  {
    label: 'Issued Documents',
    key: 'issued-documents',
    children: <IssuedDocuments />,
  },
  {
    label: 'Overall Result',
    key: 'overall-result',
    children: <OverallResult />,
  },
];

const StudentRecordTabs = () => {
  const { id } = useParams();
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const storeBasicDetails = useBasicDetails((state: any) => ({
    getRecord: state.getRecords,
    current: state.current,
  }));
  React.useEffect(() => {
    fetchSettings();
    storeBasicDetails.getRecord(id);
  }, []);

  return (
    <div className="layout-main-content">
      <Card>
      <Row justify="end" style={{ paddingBottom: 10, backgroundColor: 'white' }}>
        <Col>
          <Button type="text" style={{ color: 'red', fontSize: 16 }}>Note : * Indicates Important Fields</Button>
        </Col>
      </Row>

        <Descriptions title="Student Information" layout="vertical">
          <Descriptions.Item label="Student Name">
            {storeBasicDetails.current.lastName}{' '}
            {storeBasicDetails.current.firstName}{' '}
            {storeBasicDetails.current.middleName}
          </Descriptions.Item>
          <Descriptions.Item label="Program">
            <ProgramAsText value={storeBasicDetails.current.programId} />
            {}
          </Descriptions.Item>
          <Descriptions.Item label="User Id">
            {storeBasicDetails.current.scholarNumber}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <br />
      <Card >
        <Tabs items={tabPages} tabPosition="top" />
        <Divider></Divider>
        <br />
      </Card>

          </div>
  );
};

export default StudentRecordTabs;
