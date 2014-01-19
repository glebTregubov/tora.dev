(function ($) {
  Drupal.TBNex = Drupal.TBNex || {};
  
  Drupal.TBNex.transformWebformElementTitles = function(){
    $('.webform-client-form').find('input:not(:submit, :hidden, :radio, :checkbox), textarea').each(function(){
      var label = $(this).parents('.form-item').find('label');
      label.hide();
      var text = label.text();
      $(this).placeholder({
        'placeHolderText':text
      });
    });
  }
  
  Drupal.TBNex.matchHeights = function(){
    $(window).load(function(){
      $('#main-content .view-custom-frontpage .views-row').each(function(){
        $(this).find('.views-col .grid-inner').matchHeights();
      });
      $('#main-content .view-taxonomy-term .views-row').each(function(){
        $(this).find('.views-col .grid-inner').matchHeights();
      });
    });
  }
  
  Drupal.behaviors.actionTBNex = {
    attach: function (context) {
      $('.btn-backtotop').smoothScroll();      
      $('#comments .comment').filter(':last').addClass('last');
      $('#subscribe input.form-submit').val('Submit');
      Drupal.TBNex.matchHeights();
      Drupal.TBNex.transformWebformElementTitles();
    }
  };
  
})(jQuery);
