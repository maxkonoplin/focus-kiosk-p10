const Controller = require('../class/controller');

class Main extends Controller {

    lock(){
        return new Promise((resolve, reject) => {
            let gallery = [];

            this.progress(0);
            this.get('/hotel/2/gallery')
                .then((response) => {
                    gallery = gallery.concat(response);
                    this.progress(10);
                    return this.get('/album/1');
                })
                .then((response) => {
                    for(let i=0,l=response.length;i<l;i++){
                        gallery.splice(i*2+1, 0, response[i]);
                    }
                    this.progress(20);
                    return this.get('/album/2');
                })
                .then((response) => {
                    for(let i=0,l=response.length;i<l;i++){
                        gallery.splice(i*3+2, 0, response[i]);
                    }
                    this.progress(30);
                    return this.get('/album/3');
                })
                .then((response) => {
                    for(let i=0,l=response.length;i<l;i++){
                        gallery.splice(i*4+3, 0, response[i]);
                    }
                    this.progress(40);
                    return this.get('/album/4');
                })
                .then((response) => {
                    for(let i=0,l=response.length;i<l;i++){
                        gallery.splice(i*5+4, 0, response[i]);
                    }
                    this.progress(50);
                    return this.get('/album/5');
                })
                .then((response) => {
                    for(let i=0,l=response.length;i<l;i++){
                        gallery.splice(i*6+5, 0, response[i]);
                    }
                    this.progress(60);
                    return this.get('/album/6');
                })
                .then((response) => {
                    for(let i=0,l=response.length;i<l;i++){
                        gallery.splice(i*7+6, 0, response[i]);
                    }
                    this.progress(70);
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