function sleep (time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time);
  })
}

async function main(){
  console.log(1)
  await sleep(2000)
  console.log(2)
}

main()