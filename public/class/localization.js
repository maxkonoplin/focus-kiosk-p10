class Localization {

    constructor(app){
        this._app = app;
        this._supported = ['en', 'de'];
        this._default = 'de';
        this._locale = window.localStorage.getItem('localization');
        if(this._locale == null || !~this._supported.indexOf(this._locale)){
            this._locale = this._default;
            window.localStorage.setItem('localization', this._locale);
        }
        this._app.api._headers.set('Content-Language', this._locale);
    }

    change(locale){
        return new Promise((resolve, reject) => {
            try {
                if(!~this._supported.indexOf(locale)) return reject(new Error(`Locale "${locale}" is not supported`));
                window.localStorage.setItem('localization', locale);
                this._locale = locale;
                this._app.api._headers.set('Content-Language', this._locale);
                return resolve();
            }
            catch(err){
                return reject(err);
            }
        });
    }

    langpack(){
        return new Promise((resolve, reject) => {
            try {
                let langpack = require(`../i18n/${this._locale}.json`);
                return resolve(langpack);
            }
            catch(err){
                return reject(err);
            }
        });
    }

}

module.exports = Localization;