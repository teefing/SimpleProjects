/**
 * Build接口明确了创建Product对象不同部分的方法
 */
interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

/**
 * 具体的Build类实现了Builder接口，并提供了构建步骤的特定实现。
 * 你的程序可能有多种Builder的实现方式
 */
class ConcreteBuilder1 implements Builder {
  private product: Product1;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Product1();
  }

  /**
   * 所有的构建步骤都使用同一个产品实例
   */
  public producePartA(): void {
    this.product.parts.push("PartA1");
  }

  public producePartB(): void {
    this.product.parts.push("PartB1");
  }

  public producePartC(): void {
    this.product.parts.push("PartC1");
  }

  /**
   * 具体的Builder应该提供恢复result的特定方法。这是因为不同的builder可能会创建完全不同的产品，这些产品并没有遵从同一个接口
   * 因此，这样的方法不能被声明在基础的Builder接口中
   * 通常，将最终接口返回给客户端之后，一个builder实例应该已经准备好创建另一个产品了。
   */
  public getProduct(): Product1 {
    const result = this.product;
    this.reset();
    return result;
  }
}

/**
 * 只有在你的产品很复杂并且需要繁琐的配置时，才适合使用生成器模式
 * 不同于其他创建型模式，生成器模式的不同生成器会产生毫无关联的产品，换句话说，不同的生成器可能不遵循同一个接口
 */
class Product1 {
  public parts: string[] = [];
  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(", ")}\n`);
  }
}

/**
 * Director只有在按特定顺序构建时才有效，换句话说，Director是可选的，它相当于预置了一定的构建顺序
 */
class Director {
  private builder: Builder;
  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  /**
   * Director可以使用相同步骤构建多个产品种类
   */
  public buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

function clientCode(director: Director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);

  console.log("Standard basic product:");
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log("Standard full featured product:");
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  /**
   * 生成器模式中Director并不是必须的
   */
  console.log("Custom product:");
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
