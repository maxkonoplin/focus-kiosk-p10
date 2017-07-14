const Controller = require('../class/controller');

class Hotel extends Controller {

    rooms(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/album/4'
            })
                .then((album) => {
                    this._app.page.loading(45);
                    return this.render('rooms', {album});
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

    fruhstuck(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/album/5'
            })
                .then((album) => {
                    this._app.page.loading(45);
                    return this.render('fruhstuck', {album});
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
                            loop: false,
                            responsiveRefreshRate: 200
                        })
                        .on('changed.owl.carousel', (e) => {
                            console.log(e.item.index);
                            thumbs.data('owl.carousel').to(e.item.index, 300, true);
                        });

                    thumbs.on('initialized.owl.carousel', () => thumbs.find('.owl-item').removeClass('current').eq(0).addClass('current'))
                        .owlCarousel({
                            items : 5,
                            dots: true,
                            nav: false,
                            loop: false,
                            mouseDrag: true,
                            smartSpeed: 200,
                            slideSpeed : 500,
                            responsiveRefreshRate : 100
                        })
                        .on('changed.owl.carousel', (e) => {
                            gallery.data('owl.carousel').to(e.item.index, 100, true);
                            thumbs.find('.owl-item').removeClass('current').eq(e.item.index).addClass('current');
                        });

                    // thumbs.on('click', '.owl-item', function(e){
                    //     e.preventDefault();
                    //     gallery.data('owl.carousel').to($(this).index(), 300, true);
                    // });
                })
                .catch(reject);
        });
    }

    offers(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/hotel/2/offers'
            })
                .then((offers) => {
                console.log(offers);
                    this._app.page.loading(45);
                    return this.render('offers', {offers});
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

    team(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/hotel/2/teams'
            })
                .then((team) => {
                    this._app.page.loading(45);
                    return this.render('team', {team});
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

    vip(){
        return new Promise((resolve, reject) => {
            this._app.page.loading(0);
            this._app.api.request({
                method: 'GET',
                route: '/page/11'
            })
                .then((page) => {
                console.log(page);
                    this._app.page.loading(50);
                    return this.render('4vip', {page});
                })
                .then(() => {
                    this._app.page.loaded();
                    return resolve();
                })
                .catch(reject);
        });
    }

}

module.exports = Hotel;