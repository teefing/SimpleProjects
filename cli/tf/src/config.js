import {
  get, set, getAll, remove,
} from './utils/rc';

const config = async (action, key, value) => {
  switch (action) {
    case 'get':
      if (key) {
        const result = await get(key);
        console.log(result);
      } else {
        const obj = await getAll();
        Object.keys(obj).forEach((key) => {
          console.log(`${key}=${obj[key]}`);
        });
      }
      break;
    case 'set':
      set(key, value);
      break;
    case 'remove':
      remove(key);
      break;
    default:
      break;
  }
};

export default config;
