const Controller = require('../class/controller');

class Hotel extends Controller {

    rooms(){
        return new Promise((resolve, reject) => {
            let data = {};

            this.progress(0);
            this.get('/album/4')
                .then((album) => {
                    data.album = album;
                    this.progress(30);
                    return this.get('/hotelpage/2')
                })
                .then((hotelpage) => {
                    data.page = hotelpage[0];
                    this.progress(60);
                    return this.render('hotel/rooms', data);
                })
                .then(() => {
                    let gallery = $("#sync1");
                    let thumbs = $("#sync2");

                    this.progress(90);
                    gallery.on('initialized.owl.carousel', () => {
                        this.end()
                            .then(resolve)
                            .catch(reject);
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
                            responsiveRefreshRate: 200
                        })
						.on('changed.owl.carousel', (e) => {
							thumbs.trigger('to.owl.carousel', [e.item.index,300,true]);
                            thumbs.find('.owl-item').removeClass('current').eq(e.item.index).addClass('current');
						});

                    thumbs.on('initialized.owl.carousel', () => {
                        thumbs.find('.owl-item').removeClass('current').eq(0).addClass('current');
                    })
                        .on('click', '.owl-item', function(e){
                            e.preventDefault();
                            gallery.trigger('to.owl.carousel', [$(this).index(), 300, true]);
                        })
                        .owlCarousel({
                            items: 5,
                            responsiveRefreshRate: 100
                        });
                })
                .catch(reject);
        });
    }

    fruhstuck(){
        return new Promise((resolve, reject) => {
            let data = {};

            this.progress(0);
            this.get('/album/5')
                .then((album) => {
                    data.album = album;
                    this.progress(30);
                    return this.get('/hotelpage/3')
                })
                .then((hotelpage) => {
                    data.page = hotelpage[0];
                    this.progress(60);
                    return this.render('hotel/fruhstuck', data);
                })
                .then(() => {
                    let gallery = $("#sync1");
                    let thumbs = $("#sync2");

                    this.progress(90);
                    gallery.on('initialized.owl.carousel', () => {
                        this.end()
                            .then(resolve)
                            .catch(reject);
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
                            responsiveRefreshRate: 200
                        })
                        .on('changed.owl.carousel', (e) => {
                            thumbs.trigger('to.owl.carousel', [e.item.index,300,true]);
                            thumbs.find('.owl-item').removeClass('current').eq(e.item.index).addClass('current');
                        });

                    thumbs.on('initialized.owl.carousel', () => {
                        thumbs.find('.owl-item').removeClass('current').eq(0).addClass('current');
                    })
                        .on('click', '.owl-item', function(e){
                            e.preventDefault();
                            gallery.trigger('to.owl.carousel', [$(this).index(), 300, true]);
                        })
                        .owlCarousel({
                            items: 5,
                            responsiveRefreshRate: 100
                        });
                })
                .catch(reject);
        });
    }

    offers(){
        return new Promise((resolve, reject) => {
            let data = [];

            this.progress(0);
            this.get('/place/1/offers')
                .then((offers) => {
                    data = data.concat(offers);
                    this.progress(30);
                    return this.get('/place/2/offers');
                })
                .then((offers) => {
                    data = data.concat(offers);
                    this.progress(60);
                    return this.render('hotel/offers', {offers: data});
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    team(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/hotel/2/teams')
                .then((team) => {
                    this.progress(45);
                    return this.render('hotel/team', {team});
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    vip(){
        return new Promise((resolve, reject) => {
            let items = [];

            this.progress(0);
            this.get('/page/16')
                .then((page) => {
                    this.progress(20);
                    items.push(page);
                    return this.get('/page/17');
                })
                .then((page) => {
                    this.progress(40);
                    items.push(page);
                    return this.get('/page/18');
                })
                .then((page) => {
                    this.progress(60);
                    items.push(page);
                    return this.get('/page/19');
                })
                .then((page) => {
                    this.progress(80);
                    items.push(page);
                    return this.render('hotel/4vip', {items});
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

module.exports = Hotel;