const Controller = require('../class/controller');
const View = require('../class/view');

class Settings extends Controller {

    scan(){
        return new Promise((resolve, reject) => {
            this._app.network.scan()
                .then((networks) => {
                    let view = new View('wifi', {networks});
                    let element = $(view.toString());
                    element.dialog({
                        title: 'Wi-Fi networks',
                        modal: true
                    });
                })
                .catch(reject);
        });
    }

}

module.exports = Settings;