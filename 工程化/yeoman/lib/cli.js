#!/usr/bin/env node
'use strict';
const meow = require('meow');
const tfModule = require('./');

const cli = meow(`
Usage
  $ tf_module [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ tf_module
  unicorns
  $ tf_module rainbows
  unicorns & rainbows
`);
