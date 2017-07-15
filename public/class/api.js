const url = require('url');
const path = require('path');

class API {

    constructor(app){
        this._app = app;
        this._base = 'http://api.alpenpad.com/v2';
        this._headers = new Headers({
            'Accept': 'application/json'
        });
    }

    request(options){
        return new Promise((resolve, reject) => {
            try {
                options = Object.assign({}, options);
                fetch(this._base + options.route, {
                    method: options.method || 'GET',
                    mode: 'cors',
                    headers: this._headers,
                    body: options.body
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        if (data.error) return reject(new Error(data.error));
                        if (!data.success) return reject(new Error(data.message));
                        return resolve(data.data);
                    })
                    .catch(reject);
            }
            catch(err){
                return reject(err);
            }
        });
    }

    authenticate(){
        return new Promise((resolve, reject) => {
            try {
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
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        this._headers.set('Authorization', data.token_type + ' ' + data.access_token);
                        return resolve();
                    })
                    .catch(reject);
            }
            catch (err) {
                return reject(err);
            }
        });
    }

}

module.exports = API;