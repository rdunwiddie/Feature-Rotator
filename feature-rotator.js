$(window).load(function() {
	//reset feature details for
	$('#feature li.thumb').equalHeights();
	$('#feature').featureRotator({
	  'width' : '700',
	  'height' : '300',
	  'count' : '4',
	  'padding' : '10'
	});
	$('.feature').click(function(e){
		$(this).featureRotator('update',e);
	});
	$('.feature').hover(function(e){
		$(this).featureRotator('hover',e)
	},
	function(e){
		$(this).featureRotator('leave',e)
	});
	
});
// Respond to browser resizing 
$(window).resize(function() {
	$('#feature div.current').featureRotator('update',$(this));
});

// Determin if javascript is turned off
jQuery(function($){
    $('html').removeClass('no-js');
});	

(function( $ ) {

	var methods = {
		init : function( options ) {
			// Default featue settings
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
				
			   $('#feature').css({'max-width':settings.width+'px'});
				
			   // set Variables
			   var $featureWidth = $('#feature').innerWidth(),
			      $featurelist = '<ul>',
			      $feature = $('#feature'),
			      $features = $feature.find('.feature'),
			      $tabWidth = ((($featureWidth / settings.count) - ((settings.padding*2)+1)) * (100/$featureWidth)), // 16px padding each side plus 1px side border
				  $test = $('#feature').outerWidth();
		
			$features.width(($tabWidth)+'%');
			$features.css({'padding': settings.padding+'px'})
			
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
			
				if($this.find('img').length){
						    	$featurelist += '<li id="img'+ $this.attr('id') +'" class="'+ curr +'"><a href="'+ link +'"><img src="'+ $this.find('img').attr('src') +'" alt="'+ txt +'" title="'+ txt +'"></a></li>';
							}
							else if($this.find('iframe').length){
								$featurelist += '<li id="img'+ $this.attr('id') +'" class="'+ curr +'">'+ vid + '</li>';
							}							
			    });
			
			$featurelist += '</ul>';

			
			$feature.prepend($featurelist);
			$feature.find('li.current').siblings().hide();
			$features.css({'margin-top':$('#feature li img').height()});
			$features.equalHeights();
			$feature.find('.feature.current').css({'height':$features.height()+30}).css({'margin-top':$('#feature li img').height()-30+'px'});
		
			
       	}); // end init
 	},
		hover : function( e  ) { 
			var h = $(this).height(),
			    m = $(this).offset(),
			    fh = $('#feature ul li.current').height(),
			    mt = $(this).css('margin-top');
				
			$(this).addClass('hover');
			if ( $(this).hasClass('current')){			
				$(this).height(h).css({'margin-top':fh-30});
			}else{
				$(this).height(h+15).css({'margin-top':fh - 15});
			}
		},
		leave : function(e){
			var h = $(this).height(),
			    m = $(this).offset(),
			    fh = $('#feature ul li.current').height();
				
			$(this).height(h-15).css({'margin-top':fh });
			$(this).removeClass('hover');
			
			if ( $(this).hasClass('current')){
				$(this).height(h).css({'margin-top':fh - 30});
			}else{
				$(this).height(h-15).css({'margin-top':fh });
			}
			
		},
   		update : function( e  ) { 
			var $listheight = $('#feature li.current').height();
			var $featureheight = $('#feature .feature:not(.current)').height();
		  	$featureWidth = $('#feature').innerWidth();
			$('#feature').find('li').css({'height':'auto'});
		
  			var $this = $(this),
			    $feature = $('#feature');
	            $features = $feature.find('.feature');
		    
			if($this.hasClass('current')) {
		 		$tabWidth = ((($featureWidth / $('#feature .feature').length) - ((10*2)+1)) * (100/$featureWidth)); // 16px padding each side plus 1px side border		
				$('#feature').find('.feature').width(($tabWidth)+'%');
				$('#feature .feature').css({'margin-top':$('#feature li').height()});
		  		$('#feature .feature.current').css({'margin-top':$('#feature li').height()-30});
			
		    } else {
			    e.preventDefault();
				$featureheight = $this.height();
				$feature.find('.feature.current').stop(true,true).css({'height':$featureheight-15}).css({'margin-top':$listheight});
			    $feature.find('.feature').stop(true,true).removeClass('current');
			    $feature.find('li.current').stop(true,true).removeClass('current').fadeOut('slow');
				$this.addClass('current').stop(true,true).animate({'margin-top':$listheight-30+'px'},{duration:300,queue:false})
				$this.animate({'height':$this.height()+15},{duration:300,queu:false});
				$('#img' + $this.attr('id')).addClass('current').fadeIn('slow');
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
      $(this).height(tallest);
    });
  }
})(jQuery);
