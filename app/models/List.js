JMVC.models.List = function () {
	this._items = [].concat(arguments);
	this._selectedIndex = -1;

	this.itemAdded = new JMVC.Event(this);
	this.itemRemoved = new JMVC.Event(this);
	this.selectedIndexChanged = new JMVC.Event(this);
};


JMVC.prototipize(JMVC.models.List, {
	getItems : function () {
		return [].concat(this._items);
	},

	addItem : function (item) {
		this._items.push(item);
		this.itemAdded.notify({item: item});
	},

	removeItemAt : function (index) {
		var item = this._items[index];
		this._items.splice(index, 1);
		this.itemRemoved.notify({item: item});
		if (index == this._selectedIndex)
			this.setSelectedIndex(-1);
	},

	getSelectedIndex : function () {
		return this._selectedIndex;
	},

	setSelectedIndex : function (index) {
		var previousIndex = this._selectedIndex;
		this._selectedIndex = index;
		this.selectedIndexChanged.notify({previous: previousIndex});
	}
});