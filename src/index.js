import './index.scss'
function component() {
  const element = document.createElement('div')
  element.className = 'main'
  element.innerHTML = 'hello world!'


  element.addEventListener('click', () => {
    import('./something').then((res) => {
      res.sayhello()
    })

  })

  return element
}


document.body.append(component())