const Controller = require('../class/controller');

class Main extends Controller {

    lock(){
        return new Promise((resolve, reject) => {
            let gallery = [];

            this.progress(0);
            this.get('/hotel/2/gallery')
                .then((response) => {
                    gallery = gallery.concat(response);
                    this.progress(20);
                    return this.get('/album/1');
                })
                .then((response) => {
                    gallery = gallery.concat(response);
                    this.progress(40);
                    return this.get('/album/2');
                })
                .then((response) => {
                    gallery = gallery.concat(response);
                    this.progress(60);
                    return this.render('main/lock', {gallery});
                })
                .then(() => {
                    let gallery = $('.background-slide.owl-carousel');
                    this.progress(80);
                    gallery.on('initialized.owl.carousel', () => {
                        this.end()
                            .then(resolve)
                            .catch(reject);
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
            let locale = this._app.localization._locale;
            this.progress(0);
            this.render('main/home', {
                isDE: locale === 'de',
                isEN: locale === 'en'
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

module.exports = Main;