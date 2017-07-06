const events = require('events');
const config = require('../../config/api.json');

function API(){
    if(!(this instanceof API)) return new API();

    events.EventEmitter.call(this);

    this.base = config.base;
    this.locale = config.locale;
    this.headers = new Headers({
        'Accept': 'application/json',
        'Content-Language': this.locale
    });

    fetch('http://alpenpad.com/jwt/token', {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        }),
        mode: 'cors',
        body: JSON.stringify({
            'client_key': 't2YijLdhSK',
            'client_secret': '0Hl6TmKnQ0voHU3YO18SMruVHz2nvH20DA8XWMNg'
        })
    }).then(function(response){
        response.json().then(function(data){
            this.headers.set('Authorization', data.token_type + ' ' + data.access_token);
            this.emit('init');
        }.bind(this)).catch(function(err){
            this.emit('error', err);
        }.bind(this));
    }.bind(this)).catch(function(err){
        this.emit('error', err);
    }.bind(this));

    return this;
}

API.prototype = Object.create(events.EventEmitter.prototype);
API.prototype.constructor = API;

API.prototype.setLocale = function(locale){
    this.locale = locale;
    this.headers.set('Content-Language', this.locale);
    return this;
};

API.prototype.request = function(){

};

module.exports = API;