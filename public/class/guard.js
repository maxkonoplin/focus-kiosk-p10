const crypto = require('crypto');

class Guard {

    constructor(app){
        this._app = app;
        this._storage = window.localStorage;
    }

    installed(){
        return new Promise((resolve, reject) => {
            try {
                let password = this._storage.getItem('guard-hash');
                if(password == null) return reject();
                return resolve();
            }
            catch(err){
                return reject(err);
            }
        });
    }

    store(password){
        return new Promise((resolve, reject) => {
            try {
                if(typeof password != 'string') return reject(new Error('Password must be a string'));
                if(!password.length) return reject(new Error('Password cannot be an empty string'));
                this._storage.setItem('guard-hash', crypto.createHash('sha256').update(password).digest('base64'));
                return resolve();
            }
            catch(err){
                return reject(err);
            }
        });
    }

    check(password){
        return new Promise((resolve, reject) => {
            try {
                if(this._storage.getItem('guard-hash') != crypto.createHash('sha256').update(password).digest('base64')){
                    return reject();
                }
                return resolve();
            }
            catch(err){
                return reject(err);
            }
        });
    }

}

module.exports = Guard;