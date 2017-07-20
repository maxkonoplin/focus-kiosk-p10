const dns = require('dns');
const wifi = require('node-wifi');

class Network {

    constructor(app){
        this._app = app;
        this._wifi = wifi;
        this._wifi.init({
            debug: false,
            iface: 'wlan0',
            connectionTimeout: 10000
        });
    }

    ping(){
        return new Promise((resolve, reject) => {
            try {
                dns.resolve('www.google.com', (err) => {
                    if(err) return reject(err);
                    return resolve();
                });
            }
            catch(err){
                return reject(err);
            }
        });
    }

    scan(){
        return new Promise((resolve, reject) => {
            try {
                this._wifi.scan((err, networks) => {
                    if(err) return reject(err);
                    return resolve(networks);
                });
            }
            catch(err){
                return reject(err);
            }
        });
    }

    connect(options){
        return new Promise((resolve, reject) => {
            try {
                options = Object.assign({}, options);
                this._wifi.connect(options, (err) => {
                    if(err) return reject(err);
                    return resolve();
                });
            }
            catch(err){
                return reject(err);
            }
        });
    }

}

module.exports = Network;