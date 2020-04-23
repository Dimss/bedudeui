import React from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import CoronaStatus from './CoronaStatus'
const { Header, Content, Footer } = Layout;





function App() {
  return (

    <Layout className="layout">
      <Header className="my-header">
        <div className="logo"><div className="logo-text">BeDude Status</div></div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Status</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        </Breadcrumb>
        <div className="site-layout-content">
          <CoronaStatus />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>BeDude - Corona Status</Footer>
    </Layout>
  );
}

export default App;
