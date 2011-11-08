App.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    
    initComponent: function() {
        Ext.apply(this, {
            items: [
                { xtype: 'App.views.SitesList', id: 'sitesList' },
                { xtype: 'App.views.SitesForm', id: 'sitesForm' },
                { xtype: 'App.views.Home', id: 'home' },
                 
            ]
        });
        App.views.Viewport.superclass.initComponent.apply(this, arguments);
    },
    
    reveal: function(target, parent) {
        console.log(target);
        console.log(parent);
        var direction;
        if (target === 'home') {
            direction = 'right';
        } else if (target === 'sitesForm') {
            direction = 'left';
        } else if (target === 'sitesList') {
            direction = (parent === 'home')?'left':'right';
        }  
        this.setActiveItem(
            App.views[target],
            { type: 'slide', direction: direction }
        );
    }
});
