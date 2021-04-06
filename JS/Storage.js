class Storage {
  /**
   * @description: 初始化需要的存储类型 sessionStorage/localStorage
   */
  constructor(storage = localStorage) {
    this.storage = storage;
  }
  /**
   * @description:
   * @param { String } key // 存储的键名
   * @param { * } value // 存储的值
   * @param { Number } expires // 过期时间，毫秒数
   */
  setItem(key, value, expires = null) {
    const objValue = { value };
    if (expires && !isNaN(Number(expires))) {
      objValue.expires = new Date().valueOf() + Math.abs(Number(expires));
    }
    this.storage.setItem(key, JSON.stringify(objValue));
  }
  /**
   * @description:
   * @param { String } key // 获取的键名
   * @return { * }
   */
  getItem(key) {
    const strValue = this.storage.getItem(key);
    if (strValue) {
      const objValue = JSON.parse(strValue);
      const date = new Date().valueOf();
      if (objValue.expires && date > Number(objValue.expires)) {
        this.removeItem(key);
        return null;
      }
      return objValue.value;
    }
  }
  /**
   * @description: 从storage中移除
   * @param { String } key // 移除的键名
   */
  removeItem(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
  /**
   * @description: 获取对应storage存储的所有键和值
   * @return { Object }
   */

  getAll() {
    const obj = {};
    Object.entries(this.storage).forEach(([key, value]) => {
      obj[key] = JSON.parse(value).value;
    });
    return obj;
  }
  /**
   * @description: 获取对应storage存储的所有键和值
   * @param { Function } callback // 遍历所有时的回调处理函数
   */

  forEach(callback) {
    Object.entries(this.storage).forEach(([key, value]) => {
      callback(key, JSON.parse(value).value);
    });
  }
}
