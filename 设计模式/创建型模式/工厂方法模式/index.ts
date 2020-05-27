/**
* https://refactoringguru.cn/design-patterns/factory-method
*/

/** Creator类声明了一个factoryMethod方法，这个方法应该返回一个Product类型的对象。Creator类的子类通常实现了这个方法 */
abstract class Creator {
  /** Creator类也可以提供factorMethod方法的默认实现，子类进行覆盖 */
  public abstract factoryMethod(): Product;

  /**
   * 同时也要注意，不管他的名称，Creator类的主要职责并不是创建产品，通常，它包含了一些核心的业务逻辑，这些业务逻辑依赖于由工厂方法返回的Product对象，
   * 子类可以通过重写工厂方法和返回一个不同类型的product来间接的改变业务逻辑
   */
  public someOperation(): string {
    // 调用工厂方法来创建一个Product对象
    const product = this.factoryMethod();
    // 使用product
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

/** 具体的Creator重写了工厂方法，从而改变product的类型 */
class ConcreteCreator1 extends Creator {
  /**
   * 注意这个方法的返回类型仍然使用抽象产品类型，即使它实际上返回的是具体的产品
   */
  public factoryMethod(): Product {
    return new ConcreteProduct1()
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2()
  }
}

/**
 * Product接口声明了operation，所有具体的product都要实现它
 */
interface Product {
  operation(): string;
}

/**
 * 具体的Product提供了各种Product接口的实现方式
 */
class ConcreteProduct1 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct1}';
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct2}';
  }
}

/**
* 客户端代码接收一个具体的creator，尽管声明的还是一个通用的接口类型。只要客户端一直使用这个基础的接口类型，那么我们就可以传入任何creator的子类
*/
function clientCode(creator: Creator) {
  console.log('Client: 我不关心creator类的具体实现，但是它生效了');
  console.log(creator.someOperation());
}


console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());


