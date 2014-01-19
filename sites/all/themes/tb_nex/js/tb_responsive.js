(function ($) {
  Drupal.TBResponsive = Drupal.TBResponsive || {};
  Drupal.TBResponsive.supportedScreens = [0.5, 479.5, 719.5, 959.5, 1049.5];
  Drupal.TBResponsive.oldWindowWidth = 0;
  Drupal.TBResponsive.masonry_sidebar_container = false;
  Drupal.TBResponsive.sidebarColumnWidth = 300;
  Drupal.TBResponsive.IE8 = $.browser.msie && parseInt($.browser.version, 10) === 8;
  Drupal.TBResponsive.toolbar = false;
  
  Drupal.TBResponsive.updateResponsiveMenu = function(){
    var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    if(windowWidth < Drupal.TBResponsive.supportedScreens[3]){
      $('#menu-bar-responsive').hide();
      $('.responsive-menu-button').show();
    }
    else{
      $('.responsive-menu-button').hide();
      $('#menu-bar-responsive').show();
    }
  }

  Drupal.TBResponsive.initResponsiveMenu = function(){
    Drupal.TBResponsive.updateResponsiveMenu();
    $('.tb-main-menu-button').bind('click',function(e){
      var target = $('#menu-bar-responsive');
      if(target.css('display') == 'none') {
        window.scrollTo(0, 0);
        target.css({display: 'block'});          
      }
      else {
        target.css({display: 'none'});
      }
    });
  }

  Drupal.TBResponsive.updateSidebarColumnWidth = function() {
	Drupal.TBResponsive.masonry_sidebar_container.addClass('masonry-reload');
    var container_width = Drupal.TBResponsive.masonry_sidebar_container.width();
    var number_column = Math.round(container_width / Drupal.TBResponsive.sidebarColumnWidth);
    var column_width = Math.floor(container_width / number_column);
    Drupal.TBResponsive.masonry_sidebar_container.find('.block, .block.grid-single').css({
      width: column_width + "px"
    });
    Drupal.TBResponsive.masonry_sidebar_container.find('.block.grid-double').css({
      width: (column_width * 2) + "px"
    });
    Drupal.TBResponsive.masonry_sidebar_container.find('.block.grid-triple').css({
      width: (column_width * 3) + "px"
    });
    Drupal.TBResponsive.masonry_sidebar_container.data('basewidth', column_width);
    return column_width;
  }

  Drupal.TBResponsive.updateMasonrySidebarWidth = function(reload) {    
    if(Drupal.TBResponsive.masonry_sidebar_container) {
      Drupal.TBResponsive.updateSidebarColumnWidth();
      Drupal.TBResponsive.masonry_sidebar_container.addClass('masonry-reload');
      var options = {
        itemSelector: '.block:not(.block-quicktabs .block)',
        isResizable: false,
        isAnimated: false,
        columnWidth: function() {
          Drupal.TBResponsive.masonry_sidebar_container.removeClass('masonry-reload');
          var basewidth = Drupal.TBResponsive.masonry_sidebar_container.data('basewidth');
          if(basewidth == undefined) {
            return Drupal.TBResponsive.updateSidebarColumnWidth();
          }
      	  else {
            return basewidth;
      	  }
        }
      }
      Drupal.TBResponsive.masonry_sidebar_container.masonry(options);
    }
  }

  Drupal.TBResponsive.initMasonry = function() {
    var $container = $('#sidebar-first-wrapper .region-sidebar-first');
    if($container.length) {
      Drupal.TBResponsive.masonry_sidebar_container = $container;
      Drupal.TBResponsive.updateMasonrySidebarWidth(true);
    }
  };
  
  Drupal.TBResponsive.initResponsiveFooterMenu = function(){
    var resMenu = $('<div class="nav-primary" style="display: none"></div>');      
    resMenu.append('<h3 href="javascript: void(0);">Toggle</h3>');      
    var menu = $('#footer-menu-wrapper .menu');
    var copyMenu = menu.clone();
    copyMenu.removeClass('menu');
    var activeItem = copyMenu.find('.active');
    activeItem = (activeItem.length > 0) ? activeItem : copyMenu.find('a').eq(0);
    activeItem.parent().addClass('nav-current');
    resMenu.append(copyMenu);    
    menu.after(resMenu);
      
    $('.nav-primary')
    // toggle the menu items' visiblity
    .find('h3')
    .bind('click focus', function(){
      $(this).parent().toggleClass('expanded')
    });
    
    Drupal.TBResponsive.updateResponsiveFooterMenu();
  }
  
  Drupal.TBResponsive.updateResponsiveFooterMenu = function(){
    var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    
    if(windowWidth < Drupal.TBResponsive.supportedScreens[3]){
      $('#footer-menu-wrapper .menu').hide();
      $('#footer-menu-wrapper .nav-primary').show();
    }else{
      $('#footer-menu-wrapper .menu').show();
      $('#footer-menu-wrapper .nav-primary').hide();
    }
  }
  
  Drupal.TBResponsive.updatePositionOfNewsBlockTitle = function(){
    $('#panel-news-wrapper .region-panel-news-2 .block-title').each(function(){
      var newsBlock = $(this);
      var img = newsBlock.parent().find('.views-field-field-image');
      var top = img.height() - newsBlock.height() - newsBlock.css('margin-top').replace('px','') + img.position().top;
      newsBlock.css('top',top);
    });
  }
  
  Drupal.behaviors.actionTBResponsive = {
    attach: function (context) {
      $(window).load(function(){
        Drupal.TBResponsive.initResponsiveMenu();
        Drupal.TBResponsive.initMasonry();
        Drupal.TBResponsive.initResponsiveFooterMenu();
      	Drupal.TBResponsive.toolbar = $('#toolbar').length ? $("#toolbar") : false;
        Drupal.TBResponsive.updatePositionOfNewsBlockTitle();
        $(window).resize(function(){        
          $('body').css({'padding-top': Drupal.TBResponsive.toolbar ? (Drupal.TBResponsive.toolbar.height() - (Drupal.TBResponsive.IE8 ? 10 : 0)) : 0});
          var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
          if(windowWidth != Drupal.TBResponsive.oldWindowWidth){
            Drupal.TBResponsive.updateMasonrySidebarWidth(true);
            Drupal.TBResponsive.updateResponsiveMenu();
            Drupal.TBResponsive.oldWindowWidth = windowWidth;
            Drupal.TBResponsive.updateResponsiveFooterMenu();
            Drupal.TBResponsive.updatePositionOfNewsBlockTitle();
          }
        });
      });      
    }
  };
})(jQuery);
