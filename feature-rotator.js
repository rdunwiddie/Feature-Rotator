
$(window).load(function() {
	$('#feature li.thumb').equalHeights();
	$('#feature').featureRotator({
	  'width' : '700',
	  'height' : '300',
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
	  			'count' : '3',
				'padding' : '16'
    		};
			if ( options ) { 
				$.extend( settings, options );
			};
    		return this.each(function() {        
				var featurelist = '<ul>',
			      $feature = $('#feature'),
				  $tabs		= $('#tabs'),
			      $features = $feature.find('.feature'),
			      $tabWidth = (((settings.width / settings.count) - ((settings.padding*2)+1)) * (100/settings.width)); // 16px padding each side plus 1px side border
			  ;

			$feature.css({'max-width':settings.width})		
			$features.width(($tabWidth)+'%');
			$features.css({'padding': (settings.padding / settings.width)*100+'%'})
			
			$features.each(function(i,item){
			    var $this = $(this),
			        txt = $this.find('h2').text(),
			        link = $this.find('a').attr('href'),
					vid = $this.find('iframe').wrap('<div />').parent().html(),
			        curr = ''
			    ;

			    if(i === 0){
			      curr = 'current';
			      $this.addClass('current');
			    }
			   
			
			 //	imglist += '<li id="img'+ $this.attr('id') +'" class="'+ curr +'"><a href="'+ link +'"><img src="'+ $this.find('img').attr('src') +'" alt="'+ txt +'" title="'+ txt +'"></a></li>';
			 //   $this.prepend('<div class="overlay"></div>')
			 //        .wrapInner('<a href="'+ link +'"></a>')
			 //   ;
			
			
			
				if($this.find('img').length){
						    	featurelist += '<li id="img'+ $this.attr('id') +'" class="'+ curr +'"><a href="'+ link +'"><img src="'+ $this.find('img').attr('src') +'" alt="'+ txt +'" title="'+ txt +'"></a></li>';
						    	$this.prepend('<div class="overlay"></div>').wrapInner('<a href="'+ link +'"></a>');
							}
							else if($this.find('iframe').length){
								featurelist += '<li id="img'+ $this.attr('id') +'" class="'+ curr +'">'+ vid + '</li>';
								$this.prepend('<div class="overlay"></div>').wrapInner('<a href="'+ link +'"></a>');

							}
							
							
			});
			
			featurelist += '</ul>';

			
			$feature.prepend(featurelist);

			$feature.find('ul').height($feature.find('li img').height());
			$('<div id="arrow"></div>').insertAfter($feature.find('ul'));
	//		$feature.find('#arrow').css({'left':'0px','top':settings.height-21+'px'});//21 is height of arrow
	//		$feature.find('#arrow').css({'left':'0px','top':$feature.find('li img').height()-21+'px'});//21 is height of arrow

		  	$('#arrow').width((($feature.width()/settings.count)+5)); //46 iswidth of arrow
			$feature.find('li.current').siblings().hide();

			$tabs.height('auto');
			
			$features.each(function() {
		      if($(this).height() > tallest) {
		        tallest = $(this).outerHeight();
		      }
		    });
		 	$tabs.height(tallest);
			$features.height('100%');
		
			
       	}); // end init
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
			      $feature.find('li.current').removeClass('current').fadeOut('slow');
				  $this.addClass('current');
				  $('#img' + $this.attr('id')).addClass('current').fadeIn('slow');
				  $('#arrow').animate({'margin-left': $this.position().left});
		    };
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
