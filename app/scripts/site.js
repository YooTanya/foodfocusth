var FFC = FFC || {};

FFC = (function(w){
  // global vars
  var vars = {

  };

  var init = function(){
    FFC.vars.lang = $('html').attr('lang');
    lazyLoading();
    
    $(window).load(function() {
      $('body').addClass('loaded');
    });
  };
  var lazyLoading = function() {
    if($('body').hasClass('homepage')) {
      $('.banner-carousel').on('init', function(slick) {
          var wrapper = $('.homepage .root [class*=col-]'), count = 0, newWrapper = [];
          wrapper.each(function() {
            var wrapperScrollTop = $(this).offset().top;
            if ($(window).height() >= wrapperScrollTop - 100 || $(window).scrollTop() >= wrapperScrollTop - 100 - $(window).height()/1.2) {
              if (!$(this).hasClass('move-up')) {
                $(this).addClass('move-up');
              }
            } else {
              newWrapper.push($(this));
            }
          });
          $(window).on('scroll', function (event) {
            var currentScrollTop = $(this).scrollTop();
            for (var i = 0; i < newWrapper.length; i++) {
              var item = newWrapper[i];
              if(currentScrollTop >= item.offset().top - 100 - $(window).height()/1.2) {
                if (!item.hasClass('move-up')) {
                  item.addClass('move-up');
                  count++;
                }
              }
            }
            if (count === newWrapper.length) {
              $(window).off('scroll');
            }
          });
      })
    }
  };

  var ajax = function(url, param, type) {
    param = $.extend({'_charset_':'UTF-8'}, param);
    return $.ajax({
      type: type || 'GET',
      url: url,
      data: param
    });
  };

  return {
    init: init,
    vars: vars,
    ajax:ajax
  }
})(window);

$(document).ready(function() {
  FFC.init();
});