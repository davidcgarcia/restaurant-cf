;(function() {

  $('.step:nth-child(1)').addClass('active')

  const selector = '#contact-form'

  $('#contact-form').on('submit', function(e) {
    e.preventDefault()

    sendForm($(this))

    return false
  })

  $('.step textarea').on('keydown', (e)=>{
    if (e.keyCode == 13) {
      e.preventDefault()
      $(e.target).blur()
    }
  })

  $('.path-step').on('click', (e)=>{

    const $currentCircle = $(e.target)
    focusCircle($currentCircle)
    const position = $currentCircle.index('.path-step') + 1

    let $test = $('.step:nth-child('+position+')')

    focusNextInput($test)

  })

  $(selector).find('.input').on('change', (e)=>{
    const $input = $(e.target)

    const $nextStep = $input.parent().next('.step')
    const isFormValid = isFormValidate()

    if (!isFormValid && $nextStep.length > 0) {
      focusNextInput($nextStep)
    } else {
      formValidate()
    }

    
  })

  // Helpers

  /*
  * validar_formulario
  */
  function formValidate() {
    if (isFormValidate()) {
      sendForm()
    } else {
      let $invalidFieldset = $(selector).find('.input:invalid').first().parent()
      focusNextInput($invalidFieldset)
    }
  }

  /*
  * es_valido_formulario
  */
  function isFormValidate() {
    return document.querySelector(selector).checkValidity()
  }

  /**
  * Enfocar nuevo paso
  */
  function focusNextInput($nextStep) {
    $('.step.active').removeClass('active')
    $nextStep.addClass('active')
    $nextStep.find('.input').focus()

    // coordinar los circulos 
    const position = ($nextStep.index('.step')) + 1
    const $circle = $('.path-step:nth-child('+position+')')
    focusCircle($circle)
  }

  function focusCircle($circle) {
    $('.path-step.active').removeClass('active')
    $circle.addClass('active')
  }

  function sendForm() {
    const $form = $(selector)
    $.ajax({
      url: $form.attr('action'), 
      method: "POST",
      data: $form.formObject(),
      dataType: "json", 
      success: function() {
        $form.slideUp()
        $('#info-contacto').html('Enviamos un mensaje, nos pondremos en contacto contigo')
      }
    })
  }

})()