type MyEvent<T> = {
  target: T,
  type: string
}

type ButtonEvent = MyEvent<HTMLButtonElement>

let myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector('#button'),
  type: 'click'
}

function triggerEvent<T>(event: MyEvent<T>) {

}

triggerEvent({
  target: document.querySelector('#button'),
  type: 'click'
})