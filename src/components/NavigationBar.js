import React from 'react';
import { Menu, Layout } from 'antd';
import { 
  HomeOutlined,
  FolderOpenOutlined,
  ScanOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header } = Layout;

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/projects',
      icon: <FolderOpenOutlined />,
      label: 'Projects',
    },
    {
      key: '/scan',
      icon: <ScanOutlined />,
      label: 'Scan',
    },
    {
      key: '/login',
      icon: <LoginOutlined />,
      label: 'Login',
    }
  ];

  // Handle navigation
  const handleNavigation = (menuInfo) => {
    navigate(menuInfo.key);
  };

  return (
    <Header style={{ 
      padding: 0,
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 1,
      width: '100%',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        {/* Logo/Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginRight: '24px'
        }}>
          <span style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000'
          }}>
            GHD
          </span>
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          onClick={handleNavigation}
          items={navItems}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent'
          }}
        />
      </div>
    </Header>
  );
};

export default NavigationBar;