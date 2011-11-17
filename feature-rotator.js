
$(window).load(function() {
  $('#feature li.thumb').equalHeights();
  $('#alpha .col').equalHeights();

	var capwidth = $('.image-right').find('img').width();
	$('.image-right').css({width:capwidth});

	
	$('#feature').featureRotator({
	
	  'width' : '720',
	  'height' : '299',
	  'count' : '3'
	});

	
	$('.feature').click(function(e){
		$(this).featureRotator('update',e);
	});
});



(function( $ ) {
 

	var methods = {
		init : function( options ) {

 			var settings = {
      			'width' : '520',
	  			'height' : '100',
	  			'count' : '3'
    		};
				  if ( options ) { 
			            $.extend( settings, options );
				  };
    		return this.each(function() {        
				var imglist = '<ul>',
			      $feature = $('#feature')
			      $features = $feature.find('.feature')
			      $tabWidth = (((settings.width / settings.count) - 33) * (100/settings.width)); // 16px padding each side plus 1px side border
			  ;
			$feature.css({'width':settings.width})		
			 // $feature.css({'max-width':settings.width});
			  $features.width(($tabWidth)+'%');
			 // $features.width((100-settings.count) - (setting.count)%);

			  $features.each(function(i,item){
			    var $this = $(this),
			        txt = $this.find('h2').text(),
			        link = $this.find('a').attr('href'),
			        curr = ''
			    ;

			    if(i === 0){
			      curr = 'current';
			      $this.addClass('current');
			    }
			    imglist += '<li id="img'+ $this.attr('id') +'" class="'+ curr +'"><a href="'+ link +'"><img src="'+ $this.find('img').attr('src') +'" alt="'+ txt +'" title="'+ txt +'"></a></li>';
			    $this.prepend('<div class="overlay"></div>')
			         .wrapInner('<a href="'+ link +'"></a>')
			    ;
			  });
			  imglist += '</ul>';


			  $feature.prepend(imglist);
			  $('<div id="arrow"></div>').insertAfter($feature.find('ul'));
			//  $('#arrow').css({left:(((settings.width/settings.count) / 2) - 22)});
			  $feature.find('#arrow').css({'left':'0px','top':settings.height-21+'px'});

			  $('#arrow').width(((settings.width/settings.count))); //46 width of arrow
			  $feature.find('li.current').siblings().hide();

			  $features.css("margin-top",settings.height+"px");
			  $features.equalHeights();
       		});
 		},

   		update : function( e ) { 
	  		// Functionality
       	//	return this.each(function(){
		
  				var $this = $(this),
					$feature = $('#feature');
					
					
				    if($this.hasClass('current')) {
				      // do nothing 
				    } else {
				      e.preventDefault();
				      $feature.find('.feature').removeClass('current');
				      $feature.find('li.current')
				              .removeClass('current')
				              .fadeOut('slow')
				      ;
				      $this.addClass('current');
				      $('#img' + $this.attr('id')).addClass('current').fadeIn('slow');
				      $('#arrow').animate({left: $this.position().left});

				    };
  		//	});

		}
	};

	

 
	$.fn.featureRotator = function( method ) {
    
    	if ( methods[method] ) {
	      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
	    }    
  
	};


})(jQuery);



(function($) {
  $.fn.equalHeights = function(minHeight, maxHeight) {
    tallest = (minHeight) ? minHeight : 0;
    this.each(function() {
      if($(this).height() > tallest) {
        tallest = $(this).height();
      }
    });
    if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
    return this.each(function() {
      // $(this).height(tallest).css("overflow","auto");
      $(this).height(tallest);
    });
  }
})(jQuery);
