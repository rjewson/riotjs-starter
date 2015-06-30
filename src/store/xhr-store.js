import axios from 'axios'

axios.get('/data/test.json')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    console.log(response);
  });