import ProductStore from './store/product-store'
import XHRStore from './store/xhr-store'

let products = new ProductStore();
riot.control.addStore(products);

let xhrstore = new XHRStore();
riot.control.addStore(xhrstore);

const stores = { products, xhrstore }

export default stores
