function test() {


  // this is fucking shit
  const el = document.createElement('div')
  el.className = 'test'
  el.innerHTML = 'this is test'
  el.addEventListener('click', () => {
    import('./something').then((res) => {
      res.sayhello()
    })

  })

  return el
}

document.body.append(test())