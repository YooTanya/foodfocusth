var FFC = FFC || {};

FFC = (function(w){
  // global vars
  var vars = {

  };

  var init = function(){
    FFC.vars.lang = $('html').attr('lang');
  };
  var megaMenu = function(){
    $('.mega-menu-mobile .collapse-header:not(.no-content)').on('click.menu1Mobile', function(e) {
      e.preventDefault();
      var newContent = $(this).closest('.collapse-item').find('.collapse-inner');
      if($(this).hasClass('active')) {
        $(this).removeClass('active');
        newContent.slideUp();
      }
      else {
        $('.collapse-header.active').removeClass('active');
        $('.mega-menu-mobile .collapse-inner').slideUp();
        newContent.slideDown();
        $(this).addClass('active');
      }
    });

    $('.hamburger-box').on('click.showMenu', function(e) {
      $(this).find('.hamburger-inner').toggleClass('active');
      $('.mega-menu-mobile').slideToggle('400');
      $('.mega-menu-mobile .level-2-title.active, .mega-menu-mobile .level-1-title.has-sub.active, .mega-menu-mobile .collapse-header:not(.no-content).active').trigger('click');
      $('html, body').toggleClass('no-scrolling-nav');
    });
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
    megaMenu: megaMenu,
    ajax:ajax
  }
})(window);

$(document).ready(function() {
  FFC.init();
  FFC.megaMenu();
});