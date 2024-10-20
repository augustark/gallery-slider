(function(){

    const app = {
        slick: function() {
            const gallerySlider = $('.gallery-slider'),
                  gallerySlides = gallerySlider.children();
            
            // Checks if the slider exists or if it has more than 1 child element
            if (!gallerySlider.length || gallerySlides.length < 2) return; 
            
            // Checks if the slider contains less than 2 or equal to 3 child elements
            if (gallerySlides.length <= 3 && gallerySlides.length > 1) {
                const clonedChildren = gallerySlides.clone();
                gallerySlider.append(clonedChildren);
            }

            gallerySlider.on('init afterChange', function(event, slick, currentSlide) {
                const slides = slick.$slides,
                      defaultWidth = 400,
                      activeWidth = 800,
                      defaultWidthResp = `min(${defaultWidth}px, ${(defaultWidth/1600)*100}vw)`,
                      activeWidthResp = `min(${activeWidth}px, ${(activeWidth/1600)*100}vw)`;

                slides.each(function(index, element) {
                    $(element).css('width', defaultWidthResp);
                    
                    if ($(element).hasClass('slick-current')) {
                        $(element).css('width', activeWidthResp);
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
                autoplay: true,
                slidesToShow: 1,
                touchThreshold: 5,
                variableWidth: true,
                autoplaySpeed: 5000,
                prevArrow: $('.gallery-arrow .prev'),
                nextArrow: $('.gallery-arrow .next'),
            });
        },
    }

    $(window).ready(function() {
        app.slick();
    })

})();