function deprecate(customWarning);
function deprecate(target, name, descriptor);
function deprecate(...args){
  if (args.length > 1) {
    const [target, name, descriptor] = args;

    const oldValue = descriptor.value;
    descriptor.value = function(...rest) {
      console.log(`${name} has been deprecated`);
      return oldValue.call(this, rest);
    };
  } else {
    const customWarning = args[0];
    return function(target, name, descriptor) {
      const oldValue = descriptor.value;
      descriptor.value = function(...args) {
        console.log(`${customWarning}`);
        return oldValue.call(this, args);
      };
    };
  }
}

function testable(target) {
  target.isTestable = 'testable'
}

function onlyRead(target, name) {
  Object.defineProperty(target, name, {
    writable: false
  })
  return target[name]
}

interface IUser {
  name: string
}

@testable
class User implements IUser {
  @onlyRead
  public name

  public static isTestable

  constructor(name) {
    this.name = name;
  }

  @deprecate
  getName1() {
    return this.name;
  }

  @deprecate("已被废弃")
  getName() {
    return this.name;
  }
}

const user = new User("Bob");
user.getName();
user.getName1();
console.log(User.isTestable)
user.name = 'alice'
console.log(user.name);