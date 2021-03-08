import CRUD from './crud'

export default class Connection {
  constructor(name, version, objectStore){
    this.name = name
    this.version = version
    this.objectStore = objectStore

    this.indexedDB = window.indexedDB
      || window.mozIndexedDB
      || window.webkitIndexedDB
      || window.msIndexedDB

    this.IDBTransaction = window.IDBTransaction
      || window.webkitIDBTransaction
      || window.msIDBTransaction

    this.IDBKeyRange = window.IDBKeyRange
      || window.webkitIDBKeyRange
      || window.msIDBKeyRange
  }

  _wrapRequest(request){
    return new Promise((resolve,reject) =>{

      request.onsuccess = event => {
        let result = {}
        let db = event.target.result;
        for (let i in this.objectStore){
          result[this.objectStore[i].name] = new CRUD(db, this.objectStore[i].name)
        }
        resolve(result);
      }

      request.onupgradeneeded = event => {
        let result = {}
        let db = event.target.result;
        for (let i in this.objectStore){
          var objectStore = db.createObjectStore(
            this.objectStore[i].name,
            this.objectStore[i].options
          );

          for (let j in this.objectStore[i].createIndex) {
            objectStore.createIndex(
              this.objectStore[i].createIndex[j].name,
              this.objectStore[i].createIndex[j].fields,
              this.objectStore[i].createIndex[j].options
            );
          }

          for (let k in this.objectStore[i].data) {
            objectStore.add(this.objectStore[i].data[k]);
          }
          result[this.objectStore[i].name] = new CRUD(db, this.objectStore[i].name)
        }
      }
      request.onerror = event => reject(event)
    });
  }

  async open(){
    if (!this.indexedDB) {
      console.info("Your browser doesn't support a stable version of IndexedDB.")
    }
    return await this._wrapRequest(this.indexedDB.open(this.name, this.version));
  }
}

