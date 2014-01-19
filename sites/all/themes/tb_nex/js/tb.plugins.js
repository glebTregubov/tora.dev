(function($) {
  $.fn.placeholder = function(variables) {       
    var $this = $(this);
    //init variables
    variables = $.extend({
      'placeHolderText': 'Enter text here...',
      'placeHolderColor': 'grey'
    }, variables);
    var defaultColor = $this.css('color');
    var placeHolderColor = variables['placeHolderColor'];
    var placeHolderText = variables['placeHolderText'];
    // init placeholder
    var text = $this.val();
    if(text == '' || text == placeHolderText){
      if(text == '') {
        $this.val(placeHolderText);
      }
      $this.css('color', placeHolderColor);
    }
    $this.focus(function(){
      var target = $(this);
      if(target.val() == Drupal.t(placeHolderText)) {        
        target.val('');
        target.css('color',defaultColor);
      }
    }).blur(function(){
      var target = $(this);
      if(target.val() == '') {        
        target.val(Drupal.t(placeHolderText));
        target.css('color', placeHolderColor);
      }
    });
  };
  $.fn.clearMinHeight = function() {
    $(this).css('min-height', '0px');
  }
})(jQuery);
