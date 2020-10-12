import React from 'react';
import './App.scss';
import {
  Layout, Card, Radio, Table, Divider,
} from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';

const Heading = styled.h1`
  color: #fff;
  `;

const { Header, Content } = Layout;

function App() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      course: '23.32332',
    },
  ];

  return (
    <Layout>
      <Header thema="dark" className="header">
        <Heading>Online Courses</Heading>
      </Header>
      <Layout style={{ height: '100vh', padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Card title="Euro course">
            <Radio.Group>
              <Radio.Button value="large">Large</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
            </Radio.Group>
            <Divider />
            <Table style={{ width: '100%' }} pagination={false} columns={columns} dataSource={data} />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
