const Controller = require('../class/controller');

class Main extends Controller {

    lock(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/hotel/2/gallery')
                .then((gallery) => {
                    this.progress(45);
                    return this.render('main/lock', {gallery});
                })
                .then(() => {
                    let gallery = $('.background-slide.owl-carousel');
                    this.progress(90);
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