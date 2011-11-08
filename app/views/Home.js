App.views.Home = Ext.extend(Ext.Panel, {
    initComponent: function(){
        var sitesButton, titlebar, galleryUploadButton, mainbox;

        sitesButton = {
            itemId: 'sitesButton',
            ui: 'round',
            text: 'Sites',
            handler: this.onSitesAction,
            scope: this
        };
        
        galleryUploadButton = {
            itemId: 'galleryUploadButton',
            ui: 'round',
            text: 'Gallery Upload',
            handler: this.onGalleryUploadAction,
            scope: this
        };

        titlebar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Home',
            items: [ {
                xtype: 'spacer'
            }, sitesButton ]
        };

      

        Ext.apply(this, {
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            cls: 'card1',
            scroll: 'vertical',
            defaults: {
                layout: {
                    type: 'hbox',
                    align: 'center'
                },
                flex: 1,
                defaults: {
                    xtype: 'button',
                    cls: 'demobtn'
                }
            },
            dockedItems: [titlebar],
            items: [{
                items: [
                galleryUploadButton
                ]
            }]
        });

        App.views.Home.superclass.initComponent.call(this);
    },

    onSitesAction: function() {
        Ext.dispatch({
            controller: 'Sites',
            action: 'index',
            parent: 'home'
        });
    },
    
    onGalleryUploadAction: function() {
        if (!this.popup) {
                this.popup = new Ext.Panel({
                    floating: true,
                    modal: true,
                    centered: true,
                    width: 200,
                    styleHtmlContent: true,
                    html: '<p>Instead of this overlay we are going to try to call Objective-C upload view.</p>',
                    dockedItems: [{
                        dock: 'top',
                        xtype: 'toolbar',
                        title: 'Gallery Upload'
                    }],
                    scroll: 'vertical'
                });
            }
            this.popup.show('pop');
    }
    
});

Ext.reg('App.views.Home', App.views.Home);
