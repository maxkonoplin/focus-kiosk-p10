const Controller = require('../class/controller');

class Restaurant extends Controller {

    gallery(){
        return new Promise((resolve, reject) => {
            this.setProgress(0);
            this.get('/album/1')
                .then((album) => {
                    this.setProgress(45);
                    return this.render('restaurant/gallery', {album});
                })
                .then(() => {
                    let gallery = $("#sync1");
                    let thumbs = $("#sync2");

                    this.setProgress(90);
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

    kuche(){
        return new Promise((resolve, reject) => {
            this.setProgress(0);
            this.get('/categories/19')
                .then((categories) => {
                    this.setProgress(45);
                    return this.render('restaurant/kuche', categories[0]);
                })
                .then(() => {
                    this.setProgress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    steaks(){
        return new Promise((resolve, reject) => {
            this.setProgress(0);
            this.get('/categories/17')
                .then((categories) => {
                    this.setProgress(45);
                    return this.render('restaurant/steaks', categories[0]);
                })
                .then(() => {
                    this.setProgress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    naschkatzen(){
        return new Promise((resolve, reject) => {
            this.setProgress(0);
            this.get('/categories/21')
                .then((categories) => {
                    this.setProgress(45);
                    return this.render('restaurant/naschkatzen', categories[0]);
                })
                .then(() => {
                    this.setProgress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    wochenkarte(){
        return new Promise((resolve, reject) => {
            this.setProgress(0);
            this.get('/categories/25')
                .then((categories) => {
                    console.log(categories);
                    this.setProgress(45);
                    return this.render('restaurant/wochenkarte', categories[0]);
                })
                .then(() => {
                    this.setProgress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

}

module.exports = Restaurant;