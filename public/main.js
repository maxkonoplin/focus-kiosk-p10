$(document).ready(function(){

    const App = require('./class/app');

    let app = new App();
    window.app = app;

    app.api.authenticate()
        .then(function(){
            return app.router.dispatch('terminal/lock');
        })
        .then(function(){
            console.log('Application initialized');
        })
        .catch(function(err){
            console.error(err);
        });

    app.page.on('sleep', function(){
        app.router.dispatch('terminal/lock');
    });

});