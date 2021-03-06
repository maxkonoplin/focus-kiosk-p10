const Controller = require('../class/controller');

class Bistro extends Controller {

    gallery(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/album/6')
                .then((album) => {
                    this.progress(45);
                    return this.render('bistro/gallery', {album});
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

    shake(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/categories/24')
                .then((categories) => {
                    this.progress(45);
                    return this.render('bistro/shake', categories[0]);
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    steaks(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/categories/17')
                .then((categories) => {
                    this.progress(45);
                    return this.render('bistro/steaks', categories[0]);
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    kuche(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/categories/19')
                .then((categories) => {
                    this.progress(45);
                    return this.render('bistro/kuche', categories[0]);
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

module.exports = Bistro;