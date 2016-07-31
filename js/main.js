if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js")
} else {
  console.log('No soporta')
}

;(function(){

  let sticky = false
  let currentPosition = 0

  const imageCounter = $("[data-name='image-counter']").attr('content')
  const email = "davidg9404@gmail.com"

  $('#sticky-navigation').removeClass('hidden')
  $('#sticky-navigation').slideUp(0)
  checkScroll()
  isOpen()

  $('#menu-opener').on('click', toggleNav)

  $('.menu-link').on('click', toggleNav)

  setInterval(()=>{

    if (currentPosition < imageCounter) {
      currentPosition++
    } else {
      currentPosition = 0
    }

    $('#gallery .inner').css({
      left: '-' + currentPosition * 100 + '%'
    })
  }, 4000)

  $(window).scroll(checkScroll)

  function checkScroll() {
    const inBottom = isInBottom()

    if (inBottom && !sticky) {
      // Mostrar la navegación sticky
      sticky = true
      stickNavigation()
    } 
    if(!inBottom && sticky) {
      // Ocultar la navegación sticky
      unStickNavigation()
      sticky = false
    }
  }

  function isOpen() {
    // Reloj 24 => 5pm 11pm => 17 == 23
    let date = new Date()
    const currentHour = date.getHours()

    if (currentHour < 17 || currentHour > 23) {
      $('#is-open .text').html('Cerrado ahora <br> Abierto de 5:00pm a 11:00pm')
    }
  }

  function toggleNav() {
    $('#responsive-nav ul').toggleClass('active')
    $('#menu-opener').toggleClass('glyphicon-menu-hamburger')
  }

  function stickNavigation() {
    $('#description').addClass('fixed').removeClass('absolute')
    $('#navigation').slideUp()
    $('#sticky-navigation').slideDown()
  }

  function unStickNavigation() {
    $('#description').removeClass('fixed').addClass('absolute')
    $('#navigation').slideDown()
    $('#sticky-navigation').slideUp()
  }

  function isInBottom() {
    const $description = $('#description')
    const descriptionHeight = $description.height()

    return $(window).scrollTop() > $(window).height() - (descriptionHeight * 1.8)
  }

})()