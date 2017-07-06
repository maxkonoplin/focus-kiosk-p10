function Carousel(selector, options){
    if(!(this instanceof Carousel)) return new Carousel(selector, options);
    this.element = $(selector);
    this.element.owlCarousel(options);
    return this;
}

Carousel.prototype = Object.create(null);
Carousel.prototype.constructor = Carousel;

module.exports = Carousel;