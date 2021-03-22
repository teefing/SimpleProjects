function sizeof(obj){

}

function getSize(value) {
  if(value === null) return 0
  const type = typeof value
  switch(type) {
    case 'boolean':
      return 4
    case 'string':
      return value.length * 2
    case 'number':
      return 8
    case 'object':
      return getObjectSize(value)
  }
}

function getObjectSize(){

}