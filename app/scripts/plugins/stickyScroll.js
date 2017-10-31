;(function($, window, undefined) {
  'use strict';

  var pluginName = 'stickyScroll';
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.window = $(window);
      var that = this;
      this.window.scroll(function() {
        var winTop = that.window.scrollTop();
        if(winTop > $('.banner-wrap').outerHeight()+ 179) {
          that.element.addClass('stick');
        }else{
          that.element.removeClass('stick');
        }
        var footerSection = $('#footer').offset().top - that.element.outerHeight() - $('#header').outerHeight();
        if($(window).scrollTop() >= footerSection){
          that.element.addClass('stick-bottom-index')
        }else {
          that.element.removeClass('stick-bottom-index');
        }
      });
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

  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });
}(jQuery, window));
