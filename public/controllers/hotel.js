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