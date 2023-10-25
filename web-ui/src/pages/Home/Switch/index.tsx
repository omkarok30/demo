import React from 'react';
import { Avatar, Button, Card, Col, Collapse, Divider, Image, List, Row, Space, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CaretRightOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { getUserRoles } from '@/services/userRoles';
import IconSvg from '@/components/IconSvg';
import { useUserState } from '@/store/user';

// const { Title } = Typography;
const { Panel } = Collapse;

const Home = () => {
  const [userRoles, setUserRoles] = React.useState<[]>();
  const user = useUserState((state: any) => state.default);

  const navigate = useNavigate();

  const handleClick = () => {
    // navigate({ pathname: 'institute' });
    navigate('/home');
  };

  React.useEffect(() => {
    async function fetchData() {
      const data = await getUserRoles();
      setUserRoles(data);
    }
    if (!userRoles) {
      fetchData();
    }
  }, []);


  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={`Welcome ${user.name}!`}
      >
        <List
          itemLayout="vertical"
          size="small"
          dataSource={userRoles}
          bordered
          renderItem={corp => (
            <List.Item
              key={corp.subdomain}
              extra={<img width={272} alt="logo" src={`././src/assets/images/${corp.logo}`} />}
            >
              <List.Item.Meta
                title={<Space><IconSvg name="home" />{corp.name}</Space>}
                description={corp.subdomain}
              />
              <List
                size="small"
                itemLayout="vertical"
                dataSource={corp.roles}
                renderItem={role => (
                  <List.Item className="hover-outline-coolgray hover:shadow-md"
                    actions={[
                      <Button type="link" shape="round" icon={<LoginOutlined />} onClick={handleClick} size="large">Connect</Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<IconSvg name="user" style={{ fontSize: '24px' }} />}
                      title={role.name}
                      description={role.text}
                    />
                  </List.Item>
                )}
              />
            </List.Item>
          )}
        />
        {/*
        <div className="org-wrapper">
          <Row className="org-header" key="org-header-labels">
            <Col className="org-header-cols" span={6}></Col>
            <Col className="org-header-cols" span={6}>Organization</Col>
            <Col className="org-header-cols" span={6}>My Role</Col>
            <Col className="org-header-cols" span={6}>Connect</Col>
          </Row>
          <Divider className="org-divider" />
          {organizations
            && organizations.map((org: any) => {
              const { logo, name, role, key } = org;
              const logo_url = `././src/assets/images/${logo}`;
              const roles = role.split(', ');

              return (
                <>
                  <Collapse
                    className="collapsible-institutes"
                    accordion
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                  >
                    <Panel
                      className="panel-header"
                      header={name}
                      key={key}
                      extra={
                        <Image src={logo_url} alt={name} preview={false} className="org-logo" />
                      }
                    >
                      {roles.map((role: string) => {
                        return (
                          <Row
                            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                            className="org-rows"
                            onClick={handleClick}
                            key={`${name} ${role}`}
                          >
                            <Col span={6} className="org-data-column">
                              <Avatar
                                style={{ backgroundColor: '#87d068' }}
                                icon={<UserOutlined />}
                              />
                            </Col>
                            <Col span={6} className="org-data-column">
                              {name}
                            </Col>
                            <Col span={6} className="org-data-column">
                              <Tag color="red">{role}</Tag>
                            </Col>
                            <Col span={6} className="org-data-column">
                              <Button type="link">Login as {role}</Button>
                            </Col>
                          </Row>
                        );
                      })}
                    </Panel>
                  </Collapse>
                </>
              );
            })}
        </div> */}
      </Card>
    </div>
  );
};
export default Home;
