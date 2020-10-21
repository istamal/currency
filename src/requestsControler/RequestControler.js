import axios from 'axios';

export default class RequestControler {
  constructor(url) {
    this.data = axios.get(url);
  }

  fetchData() {
    return this.data;
  }
}
