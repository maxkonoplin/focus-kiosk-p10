const Controller = require('../class/controller');

class Bar extends Controller {

    gallery(){
        return new Promise((resolve, reject) => {
            this.setProgress(0);
            this.get('/album/3')
                .then((album) => {
                    this.setProgress(45);
                    return this.render('bar/gallery', {album});
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

    guinness(){
        return new Promise((resolve, reject) => {
            this.setProgress(0);
            this.get('/page/10')
                .then((page) => {
                    this.setProgress(45);
                    return this.render('bar/guinness', {page});
                })
                .then(() => {
                    this.setProgress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    gin(){
        return new Promise((resolve, reject) => {
            this.setProgress(0);
            this.get('/categories/5')
                .then((categories) => {
                    this.setProgress(45);
                    return this.render('bar/gin', categories[0]);
                })
                .then(() => {
                    this.setProgress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    tonic(){
        return new Promise((resolve, reject) => {
            this.setProgress(0);
            this.get('/categories/4')
                .then((categories) => {
                    this.setProgress(45);
                    return this.render('bar/tonic', categories[0]);
                })
                .then(() => {
                    this.setProgress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    cocktails(){
        return new Promise((resolve, reject) => {
            this.setProgress(0);
            this.get('/categories/22')
                .then((categories) => {
                    this.setProgress(45);
                    return this.render('bar/cocktails', categories[0]);
                })
                .then(() => {
                    this.setProgress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    tagesem(){
        return new Promise((resolve, reject) => {
            this.setProgress(0);
            this.get('/hotel/2')
                .then(() => {
                    console.log();
                    this.setProgress(45);
                    return this.render('bar/tagesem');
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

module.exports = Bar;