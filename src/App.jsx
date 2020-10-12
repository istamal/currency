import React from 'react';
import './App.scss';
import {
  Layout, Card, Radio, Table, Divider,
} from 'antd';
import XMLParser from 'react-xml-parser';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import axios from 'axios';
import * as source from './sourceConstants/index';

const Heading = styled.h1`
  color: #fff;
  `;

const { Header, Content } = Layout;

function App() {
  const [currency, setCurrency] = React.useState({ name: 'Получение...', value: 'Получение...' });
  const [currentSource, setCurrentSource] = React.useState(source.XML_SOURCE);

  const fetchData = async () => {
    const response = await axios.get(currentSource);
    if (typeof response.data === 'string') {
      const xml = new XMLParser().parseFromString(response.data);
      const euro = xml.children.find((el) => el.attributes.ID === 'R01239');
      console.log('fetching xml');
      setCurrency({ name: euro.children[3].value, value: euro.children[4].value });
    } else {
      const { data: { Valute: { EUR } } } = response;
      console.log('fetching json');
      setCurrency({ name: EUR.Name, value: EUR.Value });
    }
  };

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
    console.log(currentSource);
  };

  React.useEffect(() => {
    fetchData();
    const timer = setInterval(() => fetchData(), 10000);
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
              <Radio.Button value={source.XML_SOURCE}>Источник 1</Radio.Button>
              <Radio.Button value={source.JSON_SOURCE}>Источник 2</Radio.Button>
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
