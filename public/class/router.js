class Router {

    constructor(app){
        this._app = app;
        let context = this;
        $(document).on('click', 'a[href]', function(e){
            e.preventDefault();
            let route = $(this).attr('href');
            let data = $(this).data();
            context.dispatch(route, data);
        });
    }

    dispatch(route, data){
        return new Promise((resolve, reject) => {
            try {
                route = route.split('/');
                let controller = new (require('../controllers/' + route[0]))(this._app);
                controller[route[1]](data)
                    .then(resolve)
                    .catch(reject);
            }
            catch(err){
                return reject(err);
            }
        });
    }

}

module.exports = Router;