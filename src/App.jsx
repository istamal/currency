import React from 'react';
import './App.scss';
import {
  Layout, Card, Radio, Table, Divider,
} from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import JSONService from './dataService/JSONService';
import XMLService from './dataService/XMLService';

const Heading = styled.h1`
  color: #fff;
  `;

const { Header, Content } = Layout;

function App() {
  const [currency, setCurrency] = React.useState({ name: 'Получение...', value: 'Получение...' });
  const [currentSource, setCurrentSource] = React.useState(new XMLService());

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Курс',
      dataIndex: 'course',
      key: 'course',
    },
  ];

  const data = [
    {
      key: '1',
      name: currency.name,
      course: currency.value,
    },
  ];

  const handleSourseChange = (event) => {
    setCurrentSource(event.target.value);
  };

  const getCurrency = async (instance) => {
    const result = await instance.fetchData();
    setCurrency(result);
  };

  React.useEffect(() => {
    getCurrency(currentSource);
    const timer = setInterval(() => getCurrency(currentSource), 10000);
    return () => {
      clearInterval(timer);
    };
  }, [currentSource]);

  return (
    <Layout>
      <Header thema="dark" className="header">
        <Heading>Online Currency</Heading>
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
            <Radio.Group value={currentSource} onChange={handleSourseChange}>
              <Radio.Button value={new XMLService()}>Источник 1</Radio.Button>
              <Radio.Button value={new JSONService()}>Источник 2</Radio.Button>
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
