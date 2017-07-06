$(document).ready(function(){

    const Carousel = require('./class/carousel');
    const App = require('./class/app');
    const Template = require('./class/template');

    var app = new App();
    var lock = new Template('lock-screen');

    app.render(lock);

    app.on('navigate:home', function(){
        var template = new Template('home');
        app.render(template);
    });

    app.on('navigate:wifi', function(){
        $('.js__p_another_start').simplePopup();
    });

    app.on('render', function(){
        var carousel = new Carousel('.background-slide.owl-carousel', {
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

        var sync1 = $("#sync1");
        var sync2 = $("#sync2");
        var slidesPerPage = 5;
        var syncedSecondary = true;

        sync1.owlCarousel({
            center: true,
            items : 1,
            slideSpeed : 2000,
            nav: false,
            animateOut:"fadeOut",
            animateIn:"fadeIn",
            mouseDrag: true,
            autoplay: true,
            dots: true,
            loop: true,
            responsiveRefreshRate : 200}).on('changed.owl.carousel', syncPosition);

        sync2
            .on('initialized.owl.carousel', function () {
                sync2.find(".owl-item").eq(0).addClass("current");
            })
            .owlCarousel({
                items : slidesPerPage,
                dots: true,
                nav: false,
                mouseDrag: true,
                smartSpeed: 200,
                slideSpeed : 500,
                responsiveRefreshRate : 100
            }).on('changed.owl.carousel', syncPosition2);

        function syncPosition(el){
            //if you set loop to false, you have to restore this next line
            //var current = el.item.index;

            //if you disable loop you have to comment this block
            var count = el.item.count-1;
            var current = Math.round(el.item.index - (el.item.count/2) - .5);

            if(current < 0) {
                current = count;
            }
            if(current > count) {
                current = 0;
            }

            //end block

            sync2
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = sync2.find('.owl-item.active').length - 1;
            var start = sync2.find('.owl-item.active').first().index();
            var end = sync2.find('.owl-item.active').last().index();

            if (current > end) {
                sync2.data('owl.carousel').to(current, 100, true);
            }
            if (current < start) {
                sync2.data('owl.carousel').to(current - onscreen, 100, true);
            }
        }

        function syncPosition2(el) {
            if(syncedSecondary) {
                var number = el.item.index;
                sync1.data('owl.carousel').to(number, 100, true);
            }
        }

        sync2.on("click", ".owl-item", function(e){
            e.preventDefault();
            var number = $(this).index();
            sync1.data('owl.carousel').to(number, 300, true);
        });

        // $(function() {
        //     $(".js__p_start, .js__p_another_start").simplePopup();
        // });

        $('#inter')
            .keyboard({
                layout: 'international',
                css: {
                    input: 'form-control input-sm dark',
                    container: 'center-block well',
                    buttonDefault: 'btn btn-default',
                    buttonHover: 'btn-primary',
                    buttonAction: 'active',
                    buttonDisabled: 'disabled'
                }
            })
            .addTyping();
        $('#inter-type').click(function () {
            $('#inter').getkeyboard().reveal().typeIn("{t}Hal{l}{l}{d}e{r}{r}l'o{b}o {e}{t}World", 500);
            return false;
        });
    });

});