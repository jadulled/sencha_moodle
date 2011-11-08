App.views.SitesList = Ext.extend(Ext.Panel, {
    initComponent: function(){
        var addButton, homeButton, titlebar, list;

        addButton = {
            itemId: 'addButton',
            iconCls: 'add',
            iconMask: true,
            ui: 'plain',
            handler: this.onAddAction,
            scope: this
        };
        
        homeButton = {
            itemId: 'homeButton',
            ui: 'back',
            text: 'Home',
            handler: this.onHomeAction,
            scope: this
        }

        titlebar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Sites',
            items: [ homeButton, { xtype: 'spacer' }, addButton ]
        };

        list = {
            xtype: 'list',
            itemTpl: '{name}',
            store: App.stores.sites,
            listeners: {
                scope: this,
                itemtap: this.onItemtapAction
            }
        };

        Ext.apply(this, {
            html: 'placeholder',
            layout: 'fit',
            dockedItems: [titlebar],
            items: [list]
        });

        App.views.SitesList.superclass.initComponent.call(this);
    },

    onAddAction: function() {
        Ext.dispatch({
            controller: 'Sites',
            action: 'newForm'
        });
    },
    
    onHomeAction: function() {
        Ext.dispatch({
            controller: 'Sites',
            action: 'home'
        });
    },

    onItemtapAction: function(list, index, item, e) {
        Ext.dispatch({
            controller: 'Sites',
            action: 'editForm',
            index: index
        });
    }
});

Ext.reg('App.views.SitesList', App.views.SitesList);
