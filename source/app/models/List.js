JMVC.models.List = function () {
    var a = Array.prototype.slice.call(arguments, 0);
    this._items = a.length ? a : [];
    this._selectedIndex = -1;

    this.itemAdded = JMVC.Event.create(this);
    this.itemRemoved = JMVC.Event.create(this);
    this.listModified = JMVC.Event.create(this);
    this.selectedIndexChanged = JMVC.Event.create(this);
    this.setBuildStrategy = function (f) { this.build = f; };
};

JMVC.prototipize(JMVC.models.List, {

    getItems: function () {
        return [].concat(this._items);
    },

    addItem: function (item) {
        this._items.push(item);
        this.itemAdded.notify({ item: item });
        this.listModified.notify({ item: item });
    },

    removeItemAt: function (index) {
        var item = this._items[index];
        this._items.splice(index, 1);
        this.itemRemoved.notify({ item: item });
        this.listModified.notify({ item: item });
        if (index === this._selectedIndex) {
            this.setSelectedIndex(-1);
        }
    },

    getSelectedIndex: function () {
        return this._selectedIndex;
    },

    setSelectedIndex: function (index) {
        var previousIndex = this._selectedIndex;
        this._selectedIndex = index;
        this.selectedIndexChanged.notify({ previous: previousIndex });
    },
    build: function () {
        JMVC.W.alert('No build strategy given');
    }
});
