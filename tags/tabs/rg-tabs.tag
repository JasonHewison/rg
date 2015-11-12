<rg-tabs>
	<div class="headers" role="tablist">
		<div  
        each="{ RgTabs.tabs }" 
        class="header { active: active, disabled: disabled }"
        onclick="{ parent.select }"
        onkeyup="{ parent.keyup }"
        role="tab"
        aria-selected="{ !!active }"
        tabindex="{ active ? '0' : '-1' }"
        id="{ 'rg-tab-' + _rgId }"
        aria-controls="{ 'rg-tabpanel-' + _rgId }"
        aria-disabled="{ !!disabled }">
			<div class="heading" if="{ heading }">
				<rg-raw content="{ heading }"></rg-raw>
			</div>
		</div>
	</div>
	<div  
      each="{ RgTabs.tabs }"
      class="tab { active: active }"
      role="tabpanel"
      aria-hidden="{ !active }"
      id="{ 'rg-tabpanel-' + _rgId }"
      aria-labelledby="{ 'rg-tab-' + _rgId }">
		<div if="{ rg.isDefined(content) }">
			{ content }
		</div>
		<div if="{ rg.isDefined(include) }">
			<rg-include include="{ include }"></rg-include>
		</div>
	</div>

	<script>
		this.on('mount', () => {
			this.RgTabs = opts.tabs || new RgTabs(opts)
			this.RgTabs.on('update', () => {
				this.update()
			})
			this.update()
		})

		this.select = e => {
			this.RgTabs.select(e.item)
      e.target.blur()
		}

    this.keyup = e => {
      let newTab
      switch (e.which) {
        case 37: //Left arrow key
          newTab = this.RgTabs.selectPrev(e.item)
          break;
        case 39: //Right arrow key
          newTab = this.RgTabs.selectNext(e.item)
          break;
      }
      if (newTab) {
        document.getElementById(`rg-tab-${newTab._rgId}`).focus()
      }
    }

	</script>

	<style scoped>
		.headers {
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
		}

		.header {
			-webkit-flex: 1;
			-ms-flex: 1;
			flex: 1;
			box-sizing: border-box;
			text-align: center;
			cursor: pointer;
			box-shadow: 0 -1px 0 0 #000 inset;
		}

		.heading {
			padding: 10px;
			margin: 0;
		}

		.header.active {
			background-color: #000;
		}

		.header.active .heading {
			color: white;
		}

		.header.disabled .heading {
			color: #888;
		}

		.tab {
			display: none;
			padding: 10px;
		}

		.tab.active {
			display: block;
		}

	</style>
</rg-tabs>
