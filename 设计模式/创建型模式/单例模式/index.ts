/**
* https://refactoringguru.cn/design-patterns/singleton
*/

/**
* Singleton类定义了 `getInstance` 方法，来获取到唯一的单例
*/
class Singleton {
  private static instance: Singleton
  /**
  * Singleton的构造函数必须保持私有，以方式外部直接通过new操作符调用
  */
  private constructor() {
    // todo
  }
  /**
  * 一个用来获取单例对象的静态方法
  * 
  */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }

    return Singleton.instance
  }
}

function clientCode() {
  const s1 = Singleton.getInstance()
  const s2 = Singleton.getInstance()
  if (s1 === s2) {
    console.log('Singleton works, both variables contain the same instance.');
  } else {
    console.log('Singleton failed, variables contain different instances.');
  }
}

clientCode()