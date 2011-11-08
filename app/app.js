/* 
 * Sencha Moodle - Test HTML5 mobile app
 */


App = new Ext.Application({
    name: "Sencha Moodle",
        
    launch: function() {
        this.views.viewport = new this.views.Viewport();
        
        this.views.sitesList = this.views.viewport.down('#sitesList');
        this.views.sitesForm = this.views.viewport.down('#sitesForm');
        this.views.home = this.views.viewport.down('#home');
    }
});