import { Alert, Button, Card, Descriptions, Divider } from 'antd';
import Permission from '@/components/Permission';

function App() {
  return (
    <div className='layout-main-content'>
      <Card>
        <Alert message='This column is a demonstration of the permission function!' type='warning'></Alert>

        <Descriptions
          title='There are three accounts below, password:`password`, you can log in to different accounts to see the difference in this column:'
          layout='vertical'
          size='small'
          bordered
          style={{ marginTop: '20px' }}
        >
          <Descriptions.Item label='admin'>Super administrator (has all permissions)</Descriptions.Item>
          <Descriptions.Item label='user'>Temporary user account</Descriptions.Item>
          <Descriptions.Item label='test'>Temporary test account</Descriptions.Item>
        </Descriptions>

        <Alert
          message='Note: After logging out of the account, log in to another account, please refresh to see the effect.'
          type='error'
          style={{ marginTop: '20px' }}
        ></Alert>

        <Descriptions
          title='This page can be viewed by all users. The following is only a demonstration of the operation button permissions. For page permissions, please log in to different accounts to view the difference between the corresponding menus in the left column.'
          layout='vertical'
          size='small'
          bordered
          column={1}
          style={{ marginTop: '20px' }}
        >
          <Descriptions.Item label='Action button without validation'>
            <Button type='primary'>edit</Button>
            <Button type='primary' danger>
              delete
            </Button>
          </Descriptions.Item>
          <Divider>
            <h3>Permission Component usage:</h3>
          </Divider>
          <Descriptions.Item label='User account operational buttons'>
            <Permission role='user' noNode={<>No right to operate, this parameter can be assigned null!</>}>
              <Button type='primary'>edit</Button>
              <Button type='primary' danger>
                delete
              </Button>
            </Permission>
          </Descriptions.Item>
          <Descriptions.Item label='Test account operational buttons'>
            <Permission role='test' noNode={<>No right to operate, this parameter can be assigned null!</>}>
              <Button type='primary'>edit</Button>
              <Button type='primary' danger>
                delete
              </Button>
            </Permission>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default App;
