import { name, version, objectStore } from './config'
import Connection from './connection'

export default async (context, inject) => {
  var idb = new Connection(name, version, objectStore)
  var db = await idb.open()
  inject("db",db)
}
