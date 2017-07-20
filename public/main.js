$(document).ready(function(){

    const App = require('./class/app');

    let app = new App();
    window.app = app;

    app.api.authenticate()
        .then(function(){
            return app.router.dispatch('main/lock');
        })
        .then(function(){
            console.log('Application initialized');
        })
        .catch(function(err){
            console.error(err);
        });

    app.page.on('sleep', function(){
        app.router.dispatch('main/lock');
    });

    $.keyboard.keyaction.enter = function(base){
        if(base.el.tagName === "INPUT"){
            base.accept();
            $(base.el).parents('form').submit();
        }
        else {
            base.insertText('\r\n');
        }
    };

});