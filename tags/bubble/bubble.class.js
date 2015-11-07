class RgBubble extends RgTag {

  constructor({ isvisible = false, content = '' }) {
    super()
    this._isvisible = isvisible
    this._content = content
  }

  get isvisible() {
    return rg.toBoolean(this._isvisible)
  }
  set isvisible(isvisible) {
    this._isvisible = isvisible
  }

  get content() {
    return this._content || ''
  }
  set content(content) {
    this._content = content
  }

  showBubble() {
    clearTimeout(this._timer)
    this._timer = null
    this.isvisible = true
  }

  hideBubble() {
    if (this._timer)
      return

    this._timer = setTimeout(() => {
      this.isvisible = false
      this._timer = null
      this.update()
    }, 1000)
  }

  toggleBubble() {
    this.isvisible = !this.isvisible
  }
}
