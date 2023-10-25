import React from 'react';
import { Avatar, Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import Meta from 'antd/lib/card/Meta';

import { useInstitute } from '@/store/settings/useInstitute';
import InstituteLogo from '@/assets/images/sveri.png';

const Institute = () => {
  const navigate = useNavigate();

  const { institute, getInstitutes } = useInstitute((state: any) => ({
    institute: state.current,
    getInstitutes: state.getInstitutes,
  }));

  React.useEffect(() => {
    getInstitutes();
  }, [getInstitutes]);

  const handleActionClick = () => {
    const id = institute.id;
    navigate(`../edit/${id}`, { state: { id } });
  };

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Institute Details"
      >
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={handleActionClick}>Update</Button>
          </Col>
        </Row>
        <Card
          style={{ width: 'auto', marginTop: 16 }}
        >
          <Meta
            avatar={<Avatar src={InstituteLogo} size="large" />}
            title={institute.name}
            description={institute.displayName}
          />
        </Card>
        <Row gutter={16}>
          <Col span={12} style={{ marginTop: 16 }}>
            <Card>
              <Meta title="Address" description={institute.address1} />
            </Card>
          </Col>
          <Col span={12} style={{ marginTop: 16 }}>
            <Card>
              <Meta
                title="Commencement Year"
                description={institute.startYear}
              />
            </Card>
          </Col>
          <Col style={{ width: '50%', marginTop: 16 }}>
            <Card>
              <Meta title="Contact Details" description={institute.contact} />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default Institute;
