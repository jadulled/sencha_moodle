App.views.SitesForm = Ext.extend(Ext.form.FormPanel, {
    defaultInstructions: 'Please enter the information above.',

    initComponent: function(){
        var titlebar, cancelButton, buttonbar, saveButton, deleteButton, fields;

        cancelButton = {
            id: 'siteFormCancelButton',
            text: 'cancel',
            ui: 'back',
            handler: this.onCancelAction,
            scope: this
        };

        titlebar = {
            id: 'siteFormTitlebar',
            xtype: 'toolbar',
            title: 'Connect to site',
            items: [ cancelButton ]
        };

        saveButton = {
            id: 'siteFormSaveButton',
            text: 'save',
            ui: 'confirm',
            handler: this.onSaveAction,
            scope: this
        };

        deleteButton = {
            id: 'siteFormDeleteButton',
            text: 'delete',
            ui: 'decline',
            handler: this.onDeleteAction,
            scope: this
        };

        buttonbar = {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [deleteButton, {xtype: 'spacer'}, saveButton]
        };

        fields = {
            xtype: 'fieldset',
            id: 'siteFormFieldset',
            title: 'Connection details',
            instructions: this.defaultInstructions,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'left',
                labelWidth: '40%',
                required: false,
                useClearIcon: true,
                autoCapitalize : false
            },
            items: [
                {
                    name : 'url',
                    label: 'url',
                    placeHolder: 'http://jerome.moodle.local/~jerome/Moodle_Sencha',
                    autoCapitalize : false
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'url'
                    
                },
                {
                    name: 'username',
                    label: 'username',
                    placeHolder: 'admin',
                    xtype: 'textfield'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'username'
                },
                {
                    name: 'password',
                    label: 'password',
                    xtype: 'passwordfield'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'password'
                },
                {
                    name: 'name',
                    label: 'name',
                    xtype: 'hiddenfield'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'name'
                },
                {
                    name: 'token',
                    label: 'token',
                    xtype: 'hiddenfield'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'token'
                },
                {
                    name: 'userpictureurl',
                    label: 'userpictureurl',
                    xtype: 'hiddenfield'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'userpictureurl'
                },
                {
                    name: 'userid',
                    label: 'userid',
                    xtype: 'hiddenfield'
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'userid'
                },
            ]
        };

        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [ titlebar, buttonbar ],
            items: [ fields ],
            listeners: {
                beforeactivate: function() {
                   var deleteButton = this.down('#siteFormDeleteButton'),
                        saveButton = this.down('#siteFormSaveButton'),
                        titlebar = this.down('#siteFormTitlebar'),
                        model = this.getRecord();
                   
                   if (model.phantom) {
                        titlebar.setTitle('Connect to site');
                        saveButton.setText('connect');
                        deleteButton.hide();
                    } else {
                        titlebar.setTitle('Update connection');
                        saveButton.setText('update');
                        deleteButton.show();
                    }
                },
                deactivate: function() {this.resetForm();}
            }
        });

        App.views.SitesForm.superclass.initComponent.call(this);
    },

    onCancelAction: function() {
        Ext.dispatch({
            controller: 'Sites',
            action: 'index',
            parent: 'sitesForm'
        });
    },
    
    onSaveAction_getSiteInfo: function(data) { 
        //we are going to do our first REST web service call to retrieve general info about the site
        Ext.util.JSONP.request({
            url: this.getValues().url + '/webservice/rest/server.php',
            callbackKey: 'moodlewsrestjsonpcallback',
            method: 'post',
            scope: this,
            params: {
                wstoken: data.token,
                moodlewsrestformat: 'jsonp',
                wsfunction: 'moodle_webservice_get_siteinfo'
            },
            callback: function(sitedata) {
                this.onSaveAction_store(sitedata);
            }
        });
                
        
    },
    
    onSaveAction_store: function(sitedata) {

        var siteValues = this.getValues();
        siteValues.name = sitedata.sitename;
        siteValues.token = sitedata.token;
        siteValues.userid = sitedata.userid;
        siteValues.username = sitedata.username;
        siteValues.url = sitedata.siteurl;
        siteValues.userpictureurl = sitedata.userpictureurl;
        
        //Save the site
        var model = this.getRecord();
        Ext.dispatch({
            controller: 'Sites',
            action    : (model.phantom ? 'save' : 'update'),
            data      : siteValues,
            record    : model,
            form      : this,
            parent: 'sitesForm'
        });
    },
    

    onSaveAction: function() {
        
        
        
        //do a rest request to retrieve the token
        Ext.util.JSONP.request({
            url: this.getValues().url + '/login/token.php',
            callbackKey: 'jsonpcallback',
            method: 'post',
            scope: this,
            params: {
                username: this.getValues().username,
                password: this.getValues().password,
                service: 'moodle_mobile_app',
                jsonp: 1              
            },
            callback: function(data) {   
              this.onSaveAction_getSiteInfo(data);  
            }
        });
    },

    onDeleteAction: function() {
        Ext.Msg.confirm("Delete this site?", "", function(answer) {
            if (answer === "yes") {
                Ext.dispatch({
                    controller: 'Sites',
                    action    : 'remove',
                    record    : this.getRecord(),
                    parent: 'sitesForm'
                });
            }
        }, this);
    },

    showErrors: function(errors) {
        var fieldset = this.down('#siteFormFieldset');
        this.fields.each(function(field) {
            var fieldErrors = errors.getByField(field.name);

            if (fieldErrors.length > 0) {
                var errorField = this.down('#'+field.name+'ErrorField');
                field.addCls('invalid-field');
                errorField.update(fieldErrors);
                errorField.show();
            } else {
                this.resetField(field);
            }
        }, this);
        fieldset.setInstructions("Please amend the flagged fields");
    },

    resetForm: function() {
        var fieldset = this.down('#siteFormFieldset');
        this.fields.each(function(field) {
            this.resetField(field);
        }, this);
        fieldset.setInstructions(this.defaultInstructions);
        this.reset();
    },

    resetField: function(field) {
        var errorField = this.down('#'+field.name+'ErrorField');
        errorField.hide();
        field.removeCls('invalid-field');
        return errorField;
    }
});

Ext.reg('App.views.SitesForm', App.views.SitesForm);
