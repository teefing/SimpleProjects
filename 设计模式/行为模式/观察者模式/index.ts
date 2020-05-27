/**
* https://refactoringguru.cn/design-patterns/observer
*/



/**
* Subject 接口声明了一组用来管理订阅者的方法
*/
interface Subject {
  // 将一个订阅者关联到这个主体
  subscribe(observer: Observer): void;
  // 将一个订阅者与主体取消关联
  unsubscribe(observer: Observer): void;
  // 通知所有订阅者的事件
  notify(): void;
}

/**
* Subject类拥有一些重要的状态变量，并且当状态改变时通知观察者
*/
class SubjectConcrete implements Subject {
  /**
  * 订阅者的列表，实际使用中，这个列表会更丰富，比如根据不同的事件类型分类
  */
  private observers: Observer[] = []
  /**
  * 根据实际业务场景设置的变量
  */
  public numbers: number = 0

  /**
  * 订阅管理的方法
  */
  public subscribe(observer: Observer): void {
    const isExist = this.observers.includes(observer)
    if (isExist) {
      return console.log('已经订阅了');
    }

    console.log('Subject: 新增订阅');
    this.observers.push(observer)
  }

  public unsubscribe(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer)
    this.observers.splice(observerIndex, 1)
    console.log('Subject: 解除订阅');
  }

  /**
  * 触发一次所有订阅者的更新，实际使用中会根据不同事件类型触发对应订阅者的更新
  */
  public notify(): void {
    console.log('Subject: notifying observers');
    for (const observer of this.observers) {
      observer.update(this)
    }
  }

  // 业务逻辑代码
  public getRandom(): void {
    this.numbers = Math.random()*10
  }
}

/**
* Observer接口声明了update方法，这个方法由subject使用
*/
interface Observer {
  // 接收来自subject的更新
  update(subject: Subject): void;
}

/**
* 具体的Observers会对已经关联的更新作出反应
*/
class ConcreteObserverA implements Observer {
  public update(subject: Subject): void  {
    if (subject['numbers'] <= 7) {
      console.log(`ObserverA update, get ${subject['numbers']}`);
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (subject['numbers'] > 4) {
      console.log(`ObserverB update, get ${subject['numbers']}`);
    }
  }
}

const subject = new SubjectConcrete()
const observerA = new ConcreteObserverA()
const observerB = new ConcreteObserverB()

subject.subscribe(observerA)
subject.subscribe(observerB)

subject.getRandom()
subject.notify()

console.log('***********');
subject.unsubscribe(observerA)
subject.unsubscribe(observerB)

subject.getRandom()
subject.notify()