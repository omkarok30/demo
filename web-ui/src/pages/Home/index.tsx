import React from 'react';
import { Card, Col, Row, Tooltip } from 'antd';

import IconSvg from '@/components/IconSvg';
import ALink from '@/components/ALink';

const ChartColProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
};

function App() {
  return (
    <div className='layout-main-content'>
      <Row gutter={24}>
        <Col {...ChartColProps}>
          <Card
            hoverable
            style={{ width: 240 }}
            actions={[
              <Tooltip title="Global Settings"><ALink to="/settings/all"><IconSvg name="set" /></ALink></Tooltip>,
              <Tooltip title="Department Details"><ALink to="/settings/academic_dept"><IconSvg name="detail" /></ALink></Tooltip>,
            ]}>
            <Card.Meta
              avatar={<IconSvg name="set" style={{ fontSize: '48px' }} />}
              title="Settings"
              description=""
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
