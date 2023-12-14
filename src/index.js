
import './index.scss'
function component() {
  const element = document.createElement('div')
  element.className = 'main'
  element.innerHTML = 'hello world!'

  return element
}


document.body.append(component())