const Controller = require('../class/controller');
const View = require('../class/view');

class Settings extends Controller {

    locale(data){
        return new Promise((resolve, reject) => {
            this._app.localization.change(data.locale)
                .then(() => {
                    return this._app.router.dispatch('main/home');
                })
                .then(resolve)
                .catch(reject);
        });
    }

    scan(){
        return new Promise((resolve, reject) => {

            try {
                let loader = $(new View('popup/loader').toString());
                $('.ui-dialog-content').dialog('close');
                loader.dialog({
                    dialogClass: 'no-header',
                    modal: true
                });

                this._app.network.scan()
                    .then((networks) => {

                        let view = new View('popup/wifi', {networks});
                        let list = $(view.toString());
                        loader.dialog('close');
                        list.dialog({
                            title: 'Wi-Fi networks',
                            modal: true
                        });
                    })
                    .catch((err) => {
                        $('.ui-dialog-content').dialog('close');
                        throw err;
                    });
            }
            catch(err){
                $('.ui-dialog-content').dialog('close');
                return reject(err);
            }
        });
    }

    connect(data){
        return new Promise((resolve, reject) => {

            try {
                let loader = $(new View('popup/loader').toString());
                $('.ui-dialog-content').dialog('close');
                loader.dialog({
                    dialogClass: 'no-header',
                    modal: true
                });

                this._app.network.connect(data)
                    .then(() => {
                        loader.dialog('close');
                    })
                    .catch((err) => {
                        $('.ui-dialog-content').dialog('close');
                        return reject(err);
                    });
            }
            catch(err){
                $('.ui-dialog-content').dialog('close');
                return reject(err);
            }

        });
    }

}

module.exports = Settings;