/**
* Abstract Factory接口声明了一组返回不同抽象product的方法。
* 这些product被叫做系列并且与高层的主题或者概念相关联。
* 系列中的一个产品往往能与其他产品合作
* 一系列的产品可能有多个变种，但是一个变种的产品是无法与另一个变种的产品兼容的
*/
interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

/**
 * 具体工厂制造出一系列的产品，这些产品属于一个变种。
 * 工厂保证了同系列的产品是兼容的
 * 注意具体工厂的方法定义的返回类型是抽象的但是实际返回的对象是被实例化的具体类型
 */
class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

/**
 * 每个具体的工厂都有一个对应的产品变种
 */
class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

/**
 * 系列中的每个单独的产品应该有一个基本的interface，该产品的所有变种都必须实现这个接口
 */
interface AbstractProductA {
  usefulFunctionA(): string;
}

/**
 * 这些具体的产品都是被相应的具体工厂创建的
 */
class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
    return 'product A1'
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public usefulFunctionA(): string {
    return 'product A2'
  }
}

/**
 * 这是另一个产品的基础接口。所有产品可以互相交互，但是只有相同的具体变种产品之间的交互才能进行有效的交互
 */
interface AbstractProductB {
  /**
   * Product B 能做自己的事情
   */
  usefulFunctionB(): string;

  /**
   * 但是它也能与ProductA合作
   * 抽象工厂确保了它创建的所有产品是同一个种类的，因此这些产品之间是兼容的
   */
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/**
 * 这些具体产品由相应的具体工厂创建
 */
class ConcreteProductB1 implements AbstractProductB {
  public usefulFunctionB(): string {
    return 'product B1'
  }

  /**
   * Product B1变种只能与变种A1合作且正确工作。但是，它接收任何AbstractProductA的实例作为变量
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA()
    return `The result of the B1 collaborating with (${result})`
  }
}

class ConcreteProductB2 implements AbstractProductB {
  public usefulFunctionB(): string {
    return 'product B2'
  }

  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA()
    return `The result of the B2 collaborating with (${result})`
  }
}

/**
 * 客户端代码只和AbstractFactory和AbstractProduct相关，你可以传入任何工厂或者产品子类作为参数，而不用在内部修改它
 */
function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA()
  const productB = factory.createProductB()

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactory1())

console.log(' ');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2())
