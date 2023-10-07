;(function() {
  let list, btn, preloaderContainer

  document.addEventListener('DOMContentLoaded', () => {
    list = document.querySelector('.comments__list')
    btn = document.querySelector('.btb-load')

    if (btn) {
      btn.addEventListener('click', () => {
        createPreloader()
        disableButton()
        fetch('/server/response.php').then(response => response.text()).then(content => {
          list.insertAdjacentHTML('beforeend', content)
          removePreloader()
          enableButton()
        })
      })
    }
  })

  window.addEventListener('load', () => {
    const pagePreloader = document.querySelector('.page-preloader')
  
    if (pagePreloader) {
      pagePreloader.classList.add('done')
      setTimeout(() => pagePreloader.parentElement.removeChild(pagePreloader), 1000)
    }
  })

  function createPreloader() {
    preloaderContainer = Object.assign(document.createElement('div'), {
      className: 'preloader'
    })

    const preloader = Object.assign(document.createElement('div'), {
      className: 'lds-ellipsis'
    })

    for (let i = 0; i < 3; i ++) {
      preloader.appendChild(document.createElement('span'))
    }

    preloaderContainer.appendChild(preloader)
    list.appendChild(preloaderContainer)
  }

  function removePreloader() {
    preloaderContainer.parentElement.removeChild(preloaderContainer)
  }

  function disableButton() {
    btn.classList.add('disabled')
    btn.innerText = 'Загрузка...'
  }

  function enableButton() {
    btn.classList.remove('disabled')
    btn.innerText = 'Показать ещё'
  }
})()