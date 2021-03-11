export default class CRUD {
  constructor(db, objectStore){
    this.db = db
    this.objectStore = objectStore
  }

  _transaction(mode = "readonly"){
    var transaction = this.db.transaction(this.objectStore, mode);
    return transaction.objectStore(this.objectStore);
  }

  async _wrapRequest(request){
    return new Promise(function(resolve,reject){
      request.onsuccess = event => resolve(event.target.result);
      request.onerror = event => reject(event)
    });
  }

  async get(keyPath) {
    const transaction = this._transaction()
    return await this._wrapRequest(transaction.get(keyPath))
  }

  async getAll() {
    const transaction = this._transaction()
    let values = await this._wrapRequest(transaction.getAll())
    let keys = await this._wrapRequest(transaction.getAllKeys())
    return values.map((value, index)=> {
      value.key = keys[index]
      return value
    })
  }

  async add(data) {
    const transaction = this._transaction("readwrite")
    return await this._wrapRequest(transaction.add(data))
  }

  async remove(keyPath) {
    const transaction = this._transaction("readwrite")
    return this._wrapRequest(transaction.delete(keyPath))
  }

  async find(index, lower='', upper='') {
    const transaction = this._transaction()
    const request = transaction.index(index)

    if (lower === '' && upper === '') {
      return await getAll()
    }

    var range;
    if (lower !== '' && upper !== '') {
      range = IDBKeyRange.bound(lower, upper);
    } else if (lower === '') {
      range = IDBKeyRange.upperBound(upper);
    } else {
      range = IDBKeyRange.lowerBound(lower);
    }
    return await this._wrapRequest(request.getAll(range))
  }
}
