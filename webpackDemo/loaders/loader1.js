const util = require("util");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const core = require("@babel/core");
const loaderUtils = require("loader-utils");
const validateOptions = require("schema-utils");

module.exports = function (content, map, meta) {
  console.log("content: ", content);
  console.log("loader1");
  return content;
};
