const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(2000).then(() => log('c'))]);
const { log } = console;
createFlow([
  () => log('a'),
  () => log('b'),
  subFlow,
  [() => delay(2000).then(() => log('d')), () => log('e')],
]).run(() => {
  console.log('done');
});

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

function createFlow(effects = []) {
  const sources = effects.slice().flat();
  const run = async (cb) => {
    for (const effect of sources) {
      if (effect.run) {
        await effect.run();
      } else {
        await effect();
      }
    }
    cb && cb();
  };

  return {
    run,
  };
}
