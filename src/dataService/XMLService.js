import XMLParser from 'react-xml-parser';
import RequestControler from '../requestsControler/RequestControler';
import { XML_SOURCE } from '../sourceConstants/index';

export default class XMLService extends RequestControler {
  constructor() {
    super(XML_SOURCE);
  }

  fetchData() {
    return this.data.then((response) => {
      // eslint-disable-next-line no-console
      console.log('fetching xml');
      const xml = new XMLParser().parseFromString(response.data);
      const euro = xml.children.find((el) => el.attributes.ID === 'R01239');
      return { name: euro.children[3].value, value: euro.children[4].value };
    });
  }
}
