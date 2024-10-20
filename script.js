(function(){

    const app = {
        slick: function() {
            const gallerySlider = $('.gallery-slider');
            if (!gallerySlider.length) return;

            gallerySlider.on('init afterChange', function(event, slick, currentSlide) {
                const slides = slick.$slides;

                slides.each(function(index, element) {
                    $(element).css('width', '400px');
                    
                    if ($(element).hasClass('slick-current')) {
                        $(element).css('width', '800px');
                    }

                    if ($(element).hasClass('slick-active')) {
                        $(element).addClass('is-visible');
                        $(element).next().addClass('is-visible');
                        $(element).next().next().addClass('is-visible');
                    } 

                });

                // First occurences of slick-cloned after the visible slick-slide
                $(slides[slides.length - 1]).next().addClass('is-cloned');


            }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                const slides = slick.$slides;
                $('.slick-slide').removeClass('is-visible');
            
                if (nextSlide + 1 === slick.$slides.length) {
                    $(slick.$slides[nextSlide]).next().addClass('is-cloned');
                } else {
                    $(slides[slides.length - 1]).next().removeClass('is-cloned');
                }
            });

            gallerySlider.slick({
                slidesToShow: 1,
                touchThreshold: 5,
                variableWidth: true,
                autoplay: true,
                autoplaySpeed: 6000,
                prevArrow: $('.gallery-arrow .prev'),
                nextArrow: $('.gallery-arrow .next'),
            })
        },
        splide: function() {
            var splide = new Splide( '.splide', {
                // drag: false,
                type: 'loop',
                autoWidth: true,
            } );
            
            splide.on( 'moved', function (newIndex, prevIndex, destIndex) {
                console.log(splide)
            } );

            splide.mount();
        },
    }

    $(window).ready(function() {
        app.slick();
        app.splide();
    })

})();