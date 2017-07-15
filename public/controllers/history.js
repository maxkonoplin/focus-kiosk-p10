const Controller = require('../class/controller');

class History extends Controller {

    auracher(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/page/6')
                .then((page) => {
                    this.progress(45);
                    return this.render('history/auracher', {page});
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    stollen(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/page/9')
                .then((page) => {
                    this.progress(45);
                    return this.render('history/stollen', {page});
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    traumerei(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/page/7')
                .then((page) => {
                    this.progress(45);
                    return this.render('history/traumerei', {page});
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    katze(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/page/8')
                .then((page) => {
                    this.progress(45);
                    return this.render('history/katze', {page});
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

}

module.exports = History;