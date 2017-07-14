const Controller = require('../class/controller');

class History extends Controller {

    auracher(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/page/6'
            })
                .then((page) => {
                    this._app.page.loading(45);
                    return this.render('auracher', {page});
                })
                .then(() => {
                    this._app.page.loading(90);
                    setTimeout(() => {
                        this._app.page.loaded();
                        return resolve();
                    }, 500);
                })
                .catch(reject);
        });
    }

    stollen(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/page/9'
            })
                .then((page) => {
                    this._app.page.loading(45);
                    return this.render('stollen', {page});
                })
                .then(() => {
                    this._app.page.loading(90);
                    setTimeout(() => {
                        this._app.page.loaded();
                        return resolve();
                    }, 500);
                })
                .catch(reject);
        });
    }

    traumerei(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/page/7'
            })
                .then((page) => {
                    this._app.page.loading(45);
                    return this.render('traumerei', {page});
                })
                .then(() => {
                    this._app.page.loading(90);
                    setTimeout(() => {
                        this._app.page.loaded();
                        return resolve();
                    }, 500);
                })
                .catch(reject);
        });
    }

    katze(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/page/8'
            })
                .then((page) => {
                    this._app.page.loading(45);
                    return this.render('katze', {page});
                })
                .then(() => {
                    this._app.page.loading(90);
                    setTimeout(() => {
                        this._app.page.loaded();
                        return resolve();
                    }, 500);
                })
                .catch(reject);
        });
    }

}

module.exports = History;