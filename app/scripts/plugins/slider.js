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
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true
    });
    $('.media-carousel').each(function(){
      if($(this).find('.item').length > 6) {
        $(this).slick({
          autoplay: true,
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 1,
          dots: false,
          responsive: [{
            breakpoint: 1024,
            settings: {
              infinite: true,
              slidesToShow: 4,
              slidesToScroll: 4,
              dots: false
            }
          },
          {
            breakpoint: 768,
            settings: {
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: false
            }
          }]
        });
      }
    });
    $('.carousel').each(function() {
      if($(this).find('.item').length > 3) {
        $(this).slick({
          autoplay: true,
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
    });
  });
}(jQuery, window));
