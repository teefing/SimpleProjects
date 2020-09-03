import { version } from '../../package.json';

export const VERSION = version;

// 用户的根目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

export const RC = `${HOME}/.tfsrc`;

export const DEFAULTS = {
  registry: 'fantasticfbaby',
};
