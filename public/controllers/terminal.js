const Controller = require('../class/controller');

class Terminal extends Controller {

    lock(){
        return new Promise((resolve, reject) => {
            let hotel = null;
            let gallery = null;

            this.progress(0);
            this.get('/hotel/2')
                .then((response) => {
                    hotel = response;
                    this.progress(30);
                    return this.get('/hotel/2/gallery');
                })
                .then((response) => {
                    gallery = response;
                    this.progress(60);
                    return this.render('lock', {
                        hotel: hotel,
                        gallery: gallery
                    });
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
            this.progress(0);
            this.render('home')
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

}

module.exports = Terminal;