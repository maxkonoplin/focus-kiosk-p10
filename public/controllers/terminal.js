const Controller = require('../class/controller');

class Terminal extends Controller {

    lock(){
        return new Promise((resolve, reject) => {
            let hotel = null;
            let gallery = null;

            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/hotel/2'
            })
                .then((response) => {
                    hotel = response;
                    this._app.page.loading(30);
                    return this._app.api.request({
                        method: 'GET',
                        route: '/hotel/2/gallery'
                    });
                })
                .then((response) => {
                    gallery = response;
                    this._app.page.loading(60);
                    return this.render('lock', {
                        hotel: hotel,
                        gallery: gallery
                    });
                })
                .then(() => {
                    let gallery = $('.background-slide.owl-carousel');
                    this._app.page.loading(90);
                    gallery.on('initialized.owl.carousel', () => {
                        setTimeout(() => {
                            this._app.page.loaded();
                            return resolve();
                        }, 500);
                    })
                        .owlCarousel({
                            items: 1,
                            loop: true,
                            dots: false,
                            nav: false,
                            animateOut: 'fadeOut',
                            animateIn: 'fadeIn',
                            touchDrag: true,
                            mouseDrag: true,
                            autoplay: true,
                            slideSpeed: 200
                        });
                })
                .catch(reject);
        });
    }

    home(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/hotel/2'
            })
                .then((response) => {
                    this._app.page.loading(45);
                    return this.render('home', response);
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

module.exports = Terminal;