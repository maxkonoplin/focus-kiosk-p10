const Controller = require('../class/controller');

class Bistro extends Controller {

    index(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/album/6'
            })
                .then((album) => {
                    this._app.page.loading(45);
                    return this.render('bistro', {album});
                })
                .then(() => {
                    let gallery = $("#sync1");
                    let thumbs = $("#sync2");

                    this._app.page.loading(90);
                    gallery.on('initialized.owl.carousel', () => {
                        setTimeout(() => {
                            this._app.page.loaded();
                            return resolve();
                        }, 500);
                    })
                        .owlCarousel({
                            center: true,
                            items: 1,
                            slideSpeed: 2000,
                            nav: false,
                            animateOut: 'fadeOut',
                            animateIn: 'fadeIn',
                            mouseDrag: true,
                            autoplay: true,
                            dots: true,
                            loop: true,
                            responsiveRefreshRate: 200
                        })
                        .on('changed.owl.carousel', (e) => thumbs.data('owl.carousel').to(e.item.index, 300, true));

                    thumbs.on('initialized.owl.carousel', () => thumbs.find('.owl-item').removeClass('current').eq(0).addClass('current'))
                        .owlCarousel({
                            items : 5,
                            dots: true,
                            nav: false,
                            mouseDrag: true,
                            smartSpeed: 200,
                            slideSpeed : 500,
                            responsiveRefreshRate : 100
                        })
                        .on('changed.owl.carousel', (e) => {
                            gallery.data('owl.carousel').to(e.item.index, 100, true);
                            thumbs.find('.owl-item').removeClass('current').eq(e.item.index).addClass('current');
                        });

                    thumbs.on('click', '.owl-item', function(e){
                        e.preventDefault();
                        gallery.data('owl.carousel').to($(this).index(), 300, true);
                    });
                })
                .catch(reject);
        });
    }

    shake(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/categories/24'
            })
                .then((categories) => {
                    this._app.page.loading(45);
                    return this.render('shake', categories[0]);
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

    steaks(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/categories/17'
            })
                .then((categories) => {
                    this._app.page.loading(45);
                    return this.render('steaks', categories[0]);
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

    kuche(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/categories/19'
            })
                .then((categories) => {
                    this._app.page.loading(45);
                    return this.render('kuche', categories[0]);
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

module.exports = Bistro;