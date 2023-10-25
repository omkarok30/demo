import { Col, Row } from 'antd';

const CoRelation = () => {
  return (
    <div className="layout-main-content">
           <Row style={{ marginBottom: 20 }}>
          <Col span={12}>Level of Co-relation</Col>
        </Row>
            <Row style={{ marginBottom: 20 }} gutter={{ md: 24 }}>
          <Col span={5} className="gutter-row" style={{ marginBottom: 20 }}>No Co-relation: NA  </Col>
          <Col span={5} className="gutter-row" style={{ marginBottom: 20 }}>Low Co-relation: 1</Col>

          <Col span={5} className="gutter-row" style={{ marginBottom: 20 }}>Medium Co-relation: 2</Col>
          <Col span={4} className="gutter-row" style={{ marginBottom: 20 }}>High Co-relation: 3</Col>

</Row>
    </div>
  );
};

export default CoRelation;
