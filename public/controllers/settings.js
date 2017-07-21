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

                        let context = this;
                        let list = $(new View('popup/wifi', {networks}).toString());
                        loader.dialog('close');
                        list.dialog({
                            title: 'Wi-Fi networks',
                            modal: true
                        });
                        list.on('click', '.wifi-item', function(e){
                            e.preventDefault();

                            let network = networks[$(this).index()];
                            let password = $(new View('popup/prompt').toString());
                            let input = password.find('input');
                            input.keyboard();
                            list.dialog('close');
                            password.dialog({
                                title: `Enter password for network ${network.ssid}`,
                                modal: true,
                                width: '600px'
                            });

                            password.on('submit', (e) => {
                                e.preventDefault();

                                let value = input.val();
                                if(value.length < 8) return false;
                                password.dialog('close');
                                loader.dialog('open');
                                context._app.network.connect({
                                    ssid: network.ssid,
                                    password: value
                                })
                                    .then(() => {
                                        loader.dialog('close');
                                    })
                                    .catch((err) => {
                                        loader.dialog('close');
                                        if(err) password.dialog('open');
                                    });

                            });
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
                    .then(resolve)
                    .catch(reject);
            }
            catch(err){
                $('.ui-dialog-content').dialog('close');
                return reject(err);
            }

        });
    }

}

module.exports = Settings;