App.models.Site = Ext.regModel('Site', {
    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'url',
            type: 'string'
        }, {
            name: 'username',
            type: 'string'
        }, {
            name: 'password',
            type: 'string'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'token',
            type: 'string'
        }, {
            name: 'userpictureurl',
            type: 'string'
        }, {
            name: 'userid',
            type: 'int'
        }
       
    ],

    validations: [
        {
            type: 'presence',
            name: 'url'
        },
        {
            type: 'presence',
            name: 'username'
        },
        {
            type: 'presence',
            name: 'password'
        },
    ],

    proxy: {
        type: 'localstorage',
        id: 'sencha-sites'
    }
});
