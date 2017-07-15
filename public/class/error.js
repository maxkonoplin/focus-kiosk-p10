const raven = require('raven');

class Error {

    constructor(app){
        this._app = app;
        this._raven = raven;
        this._raven.config('https://6bad0712ccc64a3fb7121a9297e427d0:1b02fd0fa59c4b7faacefd644853ed5c@sentry.io/191860');
        this._raven.install();
    }

    report(err){
        this._raven.captureException(err);
        return this;
    }

    handle(err){
        //...
    }

}

module.exports = Error;