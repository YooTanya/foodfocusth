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

  var tab = function(){
    var ele = $('[data-tab-header]');
    if ($('html').hasClass('mobile') && ele.attr('data-has-label')) {
      var tabLabel = ele.siblings('[data-tab-label]');
      tabLabel.on('click', function(){
        ele.slideToggle();
      });
      ele.on('click', 'a', function(e){
        e.preventDefault();
        e.stopPropagation();
        var that = $(this);
        ele.slideUp('500', function(){
          var tab = that.closest('[data-tab]');
          tab.find('[data-tab-header] a.active').removeClass('active');
          var tabContent = tab.closest('[data-tab-content] .active[id]').removeClass('active');
          tabContent.find('.checked').removeClass('checked');
          var newContent = that.attr('href');
          that.addClass('active');
          var activeTab = tab.find(newContent).addClass('active');
          $('[data-comparisonBar]').comparisonBar('reset');
          $('[data-comparisonBar]').comparisonBar('loadOptions', activeTab.find('[data-item-container]').children());
          tabLabel.find('.label-container').empty().append(that.prop('outerHTML'));
        });

      });
    } else {
      ele.on('click.menu1Mobile', 'a',  function(e) {
        e.preventDefault();
        var tab = $(this).closest('[data-tab]');
        tab.find('[data-tab-header] a.active').removeClass('active');
        var tabContent = tab.find('[data-tab-content] .active[id]').removeClass('active');
        tabContent.find('.checked').removeClass('checked');
        var newContent = $(this).attr('href');
        $(this).addClass('active');
        var activeTab = tab.find(newContent).addClass('active');
      });
      if(ele.attr('data-activeByHash')) {
        var hash = window.location.hash;
        if(hash) {
          ele.find('a[href='+hash+']').trigger('click');
        }
      }
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
    megaMenu: megaMenu,
    tab: tab,
    ajax:ajax
  }
})(window);

$(document).ready(function() {
  FFC.init();
  FFC.megaMenu();
  FFC.tab();

  $('.subscribe-btn').click(function(){
    var email = $('input[name=emailInput]').val();

    if(email != ''){
      $.ajax({
           type: "POST",
           url: "http://www.foodfocusthailand.com/foodfocusthailand-2017/demo/email.php",
           data: {email: email},
           dataType: "text"
      }).done(function(res){
        if(res == 1){
          alert('Thank you for subscribing to our newsletter');
        }else{
          alert('Please refresh the page and try again. Sorry for the inconvenience');
        }
      });
    }else{
      alert('Email is empty. Please enter');
    }
  })

});