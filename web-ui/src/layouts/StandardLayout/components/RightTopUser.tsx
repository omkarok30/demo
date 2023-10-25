import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Space } from 'antd';

import { CaretDownFilled, LogoutOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { initialState, useUserState } from '@/store/user';

import { removeToken } from '@/utils/localToken';

export default memo(() => {
  const user = useUserState((state: any) => state.default);
  const setUser = useUserState((state: any) => state.updateWith);

  const navigate = useNavigate();

  const onMenuClick = useCallback(
    ({ key }: { key: string }) => {
      if (key === 'switchprofile') {
        // setUser({
        //   ...user,
        //   ...initialState,
        // });
        removeToken();
        navigate('/home/switch', {
          replace: true,
        });
      }
      if (key === 'logout') {
        setUser({
          ...user,
          ...initialState,
        });
        removeToken();
        navigate('/user/login', {
          replace: true,
        });
      }
    },
    [user, setUser],
  );
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 'switchprofile',
            icon: <UserSwitchOutlined />,
            label: <>Switch Role</>,
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: <>Logout</>,
          },
        ],
        onClick: onMenuClick,
      }}
    >
      <a className='standardlayout-top-usermenu'
        onClick={e => e.preventDefault()}>
        <Space size='small'>
          <UserOutlined />
          {user.name}
          <CaretDownFilled />
        </Space>
      </a>
    </Dropdown>
  );
});
