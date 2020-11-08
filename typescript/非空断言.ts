type MayBeNull = string | null
let str: MayBeNull = Math.random() > 0.5 ? 'a': null
function printStr(str: string) {
  
}

printStr(str)
/**类型“MayBeNull”的参数不能赋给类型“string”的参数。
  不能将类型“null”分配给类型“string” */


printStr(str!) // 人工保证str不是null