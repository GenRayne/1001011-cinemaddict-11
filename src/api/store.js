export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  getItemChild(key, childKey) {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey))[key][childKey] || [];
    } catch (err) {
      return {};
    }
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
        this._storeKey, JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  setItemChild(key, childKey, value) {
    const store = this.getItems();
    const storeChild = store[key] || {};

    this._storage.setItem(
        this._storeKey, JSON.stringify(
            Object.assign({}, store,
                {[key]: Object.assign(storeChild, {[childKey]: value})}
            )
        )
    );
  }

  removeItemChild(key, childKey, id) {
    const store = this.getItems();
    const storeChild = store[key];
    const storeChildArray = storeChild[childKey];

    const deletedItem = storeChildArray.findIndex((item) => {
      if (typeof item === `string`) {
        return item === id;
      } else {
        return item.id === id;
      }
    });

    const newStoreChild = [].concat(storeChildArray.slice(0, deletedItem), storeChildArray.slice(deletedItem + 1));

    this._storage.setItem(
        this._storeKey, JSON.stringify(
            Object.assign({}, store,
                {[key]: Object.assign(storeChild, {[childKey]: newStoreChild})}
            )
        )
    );
  }
}
