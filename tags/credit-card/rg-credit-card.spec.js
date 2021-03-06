describe('rg.creditcard', function() {
  it('exists', function() {
    expect(rg.creditcard).to.exist
  })

  it('has a validate function', function() {
    expect(rg.creditcard.validate).to.exist
  })

  // NOTE: No need to test the validator, its already done
  // https://github.com/PawelDecowski/jquery-creditcardvalidator
})

describe('rg-credit-card-number', function() {
  let tag, cardNoVisa, cardNoMaestro, placeholder, creditcard

  beforeEach(function() {
    cardNoVisa = '4000 0000 0000 0002'
    cardNoMaestro = '5018 0000 0009'
    placeholder = '0123 4567 8910 1112'
    creditcard = new RgCreditCard({
      placeholder: placeholder,
      cardnumber: cardNoVisa
    })

    $('body').append('<rg-credit-card-number></rg-credit-card-number>')
    tag = riot.mount('rg-credit-card-number', {
      card: creditcard
    })[0]
  })

  after(function () {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('populates textbox with provided value', function() {
    const textbox = $('rg-credit-card-number .card-no')
    textbox.val().should.equal(cardNoVisa)
  })

  it('sets the placeholder text correctly', function () {
    const textbox = $('rg-credit-card-number .card-no')
    textbox.attr('placeholder').should.equal(placeholder)
  })

  it('sets validation result', function() {
    creditcard.valid.should.be.true
    creditcard.icon.should.equal('visa')
  })

  it('sets validation result on input', function() {
    $('rg-credit-card-number .card-no').val(cardNoMaestro).trigger('input')
    creditcard.valid.should.be.true
    creditcard.icon.should.equal('maestro')
  })

  describe('sets validation css classes', function() {
    it('for the icon', function() {
      const textbox = $('rg-credit-card-number .card-no')
      textbox.val(cardNoMaestro).trigger('input')
      textbox.hasClass('maestro').should.be.true
      textbox.val(cardNoVisa).trigger('input')
      textbox.hasClass('visa').should.be.true
    })

    it('for a valid number', function () {
      const textbox = $('rg-credit-card-number .card-no')
      textbox.val(cardNoVisa).trigger('input')
      textbox.hasClass('valid').should.be.true
    })
  })
})

describe('rg-credit-card-number no opts', function() {
  let tag

  beforeEach(function() {

    $('body').append('<rg-credit-card-number></rg-credit-card-number>')
    tag = riot.mount('rg-credit-card-number')[0]
  })

  after(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('is blank when no cardNo is specified', function() {
    const textbox = $('rg-credit-card-number .card-no')
    textbox.val().should.equal('')
  })
})
