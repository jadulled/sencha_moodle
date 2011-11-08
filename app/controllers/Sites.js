Ext.regController('Sites', {
    store: App.stores.sites,

    index: function(options) {
        App.views.viewport.reveal('sitesList', options.parent);
    },
    
    home: function() {
        App.views.viewport.reveal('home');
    },

    newForm: function() {
        var model = new App.models.Site()
        App.views.sitesForm.load(model);
        App.views.viewport.reveal('sitesForm');
    },

    editForm: function(params) {
        var model = this.store.getAt(params.index);
        App.views.sitesForm.load(model);
        App.views.viewport.reveal('sitesForm');
    },

    save: function(params) {
        params.record.set(params.data);
        var errors = params.record.validate();

        if (errors.isValid()) {
            this.store.create(params.data);
            this.index(params);
        } else {
            params.form.showErrors(errors);
        }
    },

    update: function(params) {
        var tmpSite = new App.models.Site(params.data),
            errors = tmpSite.validate()

        if (errors.isValid()) {
            params.record.set(params.data);
            params.record.save();
            this.index(params);
        } else {
            params.form.showErrors(errors);
        }
    },

    remove: function(params) {
        this.store.remove(params.record);
        this.store.sync();
        this.index(params);
    }

});
