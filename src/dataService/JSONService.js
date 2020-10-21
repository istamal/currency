import RequestControler from '../requestsControler/RequestControler';
import { JSON_SOURCE } from '../sourceConstants/index';

export default class JsonData extends RequestControler {
  constructor() {
    super(JSON_SOURCE);
  }

  fetchData() {
    return this.data.then((response) => {
      // eslint-disable-next-line no-console
      console.log('fetching json');
      const { data: { Valute: { EUR } } } = response;
      return { name: EUR.Name, value: EUR.Value };
    });
  }
}
