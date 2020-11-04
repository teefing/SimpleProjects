class StringDataBase<K, V> {
  state: object = {}
  get(key) {
    return key in this.state ? this.state[key]:null
  }
  set(key, value) {
    this.state[key] = value
  }
  static from(state) {
    let db = new StringDataBase
    for (let key in state) {
      db.set(key, state[key])
    }
    return db
  }
}

let stringDataBase: StringDataBase = new StringDataBase


type StringDataBaseConstructor = typeof StringDataBase