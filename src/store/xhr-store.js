import axios from 'axios'

class XHRStore {

  constructor() {

    riot.observable(this)

    this._data = {};
    
  }

  getDataByID(id) {

    if (this._data[id]) {
      this.trigger(riot.XE.XE_DATA_CHANGED, this._data[id]);
      return;
    }

    let _id = id;

    axios.get('/data/data'+_id+'.json')
    .then( response => {
      //Store it locally
      this._data[_id] = response.data;
      this.trigger(riot.XE.XE_DATA_CHANGED, this._data[_id]);
    })
    .catch( response => {
      console.log("failed:"+_id);
    });

  }

}

export default XHRStore