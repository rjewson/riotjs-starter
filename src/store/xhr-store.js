import axios from 'axios'

class XHRProductStore {

  constructor() {

    riot.observable(this)

    this.initListeners();

  }

}

axios.get('/data/test.json')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    console.log(response);
  });