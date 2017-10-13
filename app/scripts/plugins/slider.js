;(function($, window, undefined) {
  'use strict';

  var pluginName = 'slickSlider';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      that.element.slick(that.options);
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  $(function() {
    $('.banner-carousel').slick({
       infinite: true,
       slidesToShow: 1,
       slidesToScroll: 1,
       dots: true
    });
    $('.banner-v-carousel').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows : false,
      dots: true,
      vertical: true,
      verticalSwiping: true
    });
    $('.carousel').each(function() {
      if($(this).find('.item').length > 3) {
        $(this).slick({
           mobileFirst: true,
           variableWidth: true,
           responsive: [{
              breakpoint: 768,
              settings: {
                 infinite: true,
                 slidesToShow: 3,
                 centerMode: true,
                 dots: false
              }
            }]
        });
      }
      else {
        $(this).addClass('static-carousel');
      }
    });
    var slideNumber = Math.floor($('.inner-container-left').width()/$('.carousel-left .item').width());
    $('.carousel-left').slick({
       infinite: false,
       dots: false,
       slidesToShow: slideNumber,
       variableWidth: true
    });

    $('.main-img').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      infinite: true,
      asNavFor: '.tiny-img'
    });
    var slideTinyNumber = Math.floor($('.tiny-img').width()/$('.tiny-img img').width());
    $('.tiny-img').slick({
      slidesToShow: slideTinyNumber,
      slidesToScroll: 1,
      asNavFor: '.main-img',
      dots: false,
      arrows: false,
      variableWidth: true,
      focusOnSelect: true,
      infinite: true
    });
  });
}(jQuery, window));
