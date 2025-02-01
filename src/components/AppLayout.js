import NavigationBar from './NavigationBar';
import { Layout } from 'antd';
function AppLayout({ children }) {
  return (
    <Layout>
      <NavigationBar />
      <Layout.Content>
        {children}
      </Layout.Content>
    </Layout>
  );
}

export default AppLayout;