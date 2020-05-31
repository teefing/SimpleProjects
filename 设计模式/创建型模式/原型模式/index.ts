class Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference

  public clone(): this {
    const clone = Object.create(this)

    clone.component = Object.create(this.component)

    clone.circularReference = {
      ...this.circularReference,
      prototype: {...this}
    }
    return clone
  }
}

class ComponentWithBackReference {
  public prototype

  constructor(prototype: Prototype) {
    this.prototype = prototype
  }
}

function clientCode() {
  const p1 = new Prototype()
  p1.primitive = 245
  p1.component = new Date()
  p1.circularReference = new ComponentWithBackReference(p1)

  const p2 = p1.clone()

  if (p1.primitive === p2.primitive) {
    console.log('原始类型数据被成功复制');
  } else {
    console.log('原始类型数据复制失败');
  }

  if (p1.component === p2.component) {
    console.log('对象数据复制失败');
  } else {
    console.log('对象数据复制成功');
  }

  if (p1.circularReference === p2.circularReference) {
    console.log('反向引用的对象复制失败');
  } else {
    console.log('反向引用的对象复制成功');
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log('反向引用的对象关联到了最初的原型');
  } else {
    console.log('反向引用的对象关联到了副本上');
  }
}

clientCode()