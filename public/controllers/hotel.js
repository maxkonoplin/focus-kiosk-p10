const Controller = require('../class/controller');

class Hotel extends Controller {

    rooms(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/album/4')
                .then((album) => {
                    this.progress(45);
                    return this.render('hotel/rooms', {album});
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
            this.progress(0);
            this.get('/album/5')
                .then((album) => {
                    this.progress(45);
                    return this.render('hotel/fruhstuck', {album});
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
            this.progress(0);
            this.get('/hotel/2/offers')
                .then((offers) => {
                    console.log(offers);
                    this.progress(45);
                    return this.render('hotel/offers', {offers});
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
            this.progress(0);
            this.get('/page/11')
                .then((page) => {
                    this.progress(50);
                    return this.render('hotel/4vip', {page});
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