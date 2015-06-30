const LOCALSTORAGE_KEY = 'company-x-products';

//Store definition
class ProductStore {
  constructor() {
    //*extend* this class with riot.observable
    riot.observable(this)
    debugger;

    //If you change the model, delete the localstoage object!
    let json = window.localStorage.getItem(LOCALSTORAGE_KEY)

    if (!json) {
      this.initData()
    } else {
      this._products = (json && JSON.parse(json)) || []
    }

    this.initListeners();

  }

  getProductById(id) {
    return this._products.filter(p => p.productID == id)[0]
  }

  initData() {
    let defaultProducts = [
      {productID:1, title:'Apples', description:'Green or red', favorite:false},
      {productID:2, title:'Bannanas', description:'Almost extinct', favorite:false},
      {productID:3, title:'Carrots', description:'Kids like them', favorite:false},
      {productID:4, title:'Potatoes', description:'Best fried', favorite:false},
      {productID:5, title:'Grapes', description:'Fruit sweets', favorite:false},
      {productID:6, title:'Bees', description:'wtf are they here for', favorite:false},
    ]
    this._products = defaultProducts
    this.saveToStorage()
  }

  initListeners() {

    let eventMap = {
      [riot.VE.LOAD_PRODUCTS] : () => {
        this.trigger(riot.SE.PRODUCTS_CHANGED, this._products);
      },
      [riot.VE.RESET_DATA] : () => {
        this.trigger(riot.SE.PRODUCTS_CHANGED, this._products);
      },
      [riot.VE.STAR_PRODUCT] : id => {
        this._products.forEach(p => {
          if (p.productID == id) {
            p.favorite = !p.favorite;
          };
        });
        this.saveToStorage();
        this.trigger(riot.SE.PRODUCTS_CHANGED, this._products);
      }
    };

    Object.keys(eventMap).forEach( key => {
      let value = eventMap[key];
      this.on(key,value);
    });

  }

  saveToStorage() {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this._products))
  }
}

//Create it
let theProductStore = new ProductStore();

// register to riot control by myself
riot.control.addStore(theProductStore)

//export it
export default theProductStore
