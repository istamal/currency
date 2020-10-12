import React from 'react';
import './App.scss';
import {
  Layout, Card, Radio, Table, Divider,
} from 'antd';
import XMLParser from 'react-xml-parser';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import axios from 'axios';
import SubMenu from 'antd/lib/menu/SubMenu';

const Heading = styled.h1`
  color: #fff;
  `;

const { Header, Content } = Layout;

function App() {
  const [currency, setCurrency] = React.useState({ name: 'Получение...', value: 'Получение...' });

  const fetchXMLData = async () => {
    const response = await axios.get('https://www.cbr-xml-daily.ru/daily_utf8.xml');
    const xml = new XMLParser().parseFromString(response.data);
    const euro = xml.children.find((el) => el.attributes.ID === 'R01239');
    console.log('fetching');
    setCurrency({ name: euro.children[3].value, value: euro.children[4].value });
  };

  const [source, setSourse] = React.useState({ name: 'source 1', fetchData: fetchXMLData });
  // const [euro, setEuro] = React.useState({});
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

  React.useEffect(() => {
    source.fetchData();
    const timer = setInterval(() => source.fetchData(), 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

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
            <Radio.Group>
              <Radio.Button value="large">Источник 1</Radio.Button>
              <Radio.Button value="default">Источник 2</Radio.Button>
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
