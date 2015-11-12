class RgTabs extends RgTag {

  constructor(opts) {
    super()
    if (rg.isUndefined(opts)) opts = {}
    this._tabs = opts.tabs
    this._onopen = opts.onopen
  }

  get onopen() {
    if (rg.isFunction(this._onopen)) return this._onopen
    return null
  }
  set onopen(onopen) {
    if (rg.isFunction(onopen)) this._onopen = onopen
  }

  get tabs() {
    if (rg.isArray(this._tabs)) {
      let activeTab = false
      this._tabs.forEach((tab, i) => {
        tab.index = i

        if (!tab.hasOwnProperty('_rgId')) tab._rgId = rg.uid()
        if (activeTab) tab.active = false
        if (tab.active) activeTab = true
      })
      return this._tabs
    }
    this._tabs = []
    return this._tabs
  }
  set tabs(tabs) {
    this._tabs = tabs
  }

  select(tab) {
    if (!tab.disabled) {
      this.tabs.forEach(tab => {
        tab.active = false
      })
      if (this.onopen) this.onopen(tab)
      tab.active = true
    }
  }

  selectNext(tab) {
    const index = this._tabs.indexOf(tab)
    let first = true
    let i = index

    while (first || i !== index) {
      first = false
      i++
      if (i >= this._tabs.length) i = 0
      const item = this._tabs[i]
      if (!item.disabled) {
        this.select(item)
        return item
      }
    }
  }

  selectPrev(tab) {
    const index = this._tabs.indexOf(tab)
    let first = true
    let i = index

    while (first || i !== index) {
      first = false
      i--
      if (i < 0) i = this.tabs.length - 1
      const item = this._tabs[i]
      if (!item.disabled) {
        this.select(item)
        return item
      }
    }
  }
}
