const Controller = require('../class/controller');

class Bar extends Controller {

    gallery(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/album/3')
                .then((album) => {
                    this.progress(45);
                    return this.render('bar/gallery', {album});
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

    guinness(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/page/10')
                .then((page) => {
                    this.progress(45);
                    return this.render('bar/guinness', {page});
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    gin(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/categories/5')
                .then((categories) => {
                    this.progress(45);
                    return this.render('bar/gin', categories[0]);
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    tonic(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/categories/4')
                .then((categories) => {
                    this.progress(45);
                    return this.render('bar/tonic', categories[0]);
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    cocktails(){
        return new Promise((resolve, reject) => {
            this.progress(0);
            this.get('/categories/22')
                .then((categories) => {
                    this.progress(45);
                    return this.render('bar/cocktails', categories[0]);
                })
                .then(() => {
                    this.progress(90);
                    return this.end();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    tagesem(){
        return new Promise((resolve, reject) => {
            let gallery = null;

            this.progress(0);
            this.get('/album/3')
                .then((album) => {
                    gallery = album;
                    this.progress(30);
                    return this.get('/categories/27');
                })
                .then((categories) => {
                    let category = categories[0];

                    let items = category.items.slice(0, 3);
                    for(let i=0, l=3-items.length; i<l; i++){
                        items.push({image: gallery[i].image});
                    }

                    this.progress(60);
                    return this.render('bar/tagesem', {
                        items,
                        content: category.description
                    });
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

module.exports = Bar;