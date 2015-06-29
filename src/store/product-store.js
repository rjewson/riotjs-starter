const LOCALSTORAGE_KEY = 'company-x-products';

//Store definition
class ProductStore {
  constructor() {
    //*extend* this class with riot.observable
    riot.observable(this)

    //If you change the model, delete the localstoage object!
    let json = window.localStorage.getItem(LOCALSTORAGE_KEY)

    if (!json) {
      this.initData()
    } else {
      this._products = (json && JSON.parse(json)) || []
    }
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

  saveToStorage() {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this._products))
  }
}

//Create it
let theProductStore = new ProductStore();

//setup event listerners
theProductStore.on(riot.VE.LOAD_PRODUCTS, () => {
  theProductStore.trigger(riot.SE.PRODUCTS_CHANGED, theProductStore._products);
});

theProductStore.on(riot.VE.RESET_DATA, () => {
  theProductStore.initData();
  theProductStore.trigger(riot.SE.PRODUCTS_CHANGED, theProductStore._products);
});

theProductStore.on(riot.VE.STAR_PRODUCT, id => {
  theProductStore._products.forEach(p => {
    if (p.productID == id) {
      p.favorite = !p.favorite;
    };
  });
  theProductStore.saveToStorage();
  theProductStore.trigger(riot.SE.PRODUCTS_CHANGED, theProductStore._products);
})

// register to riot control by myself
riot.control.addStore(theProductStore)

export default theProductStore
