/*
	Craghoppers UK site specific JS snippets
 */

// Check for touch device - not entirely reliable. Using in combination with screen size checks in css

function is_touch_device() {
 return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

if (is_touch_device() == true) {
	document.getElementsByTagName( 'html' )[0].classList.add('isTouch');
}

function rlTabs() {
    jQuery('.utc-subnav li').click(function(){
      jQuery('.utc-subnav li').toggleClass('active');
      jQuery('.tabs-content div').toggleClass('active');
    });
  }

  function rlPop(){
    // add click events for popups
    var nodeList = document.body.querySelectorAll("[data-action='pop']");
    var nodes = Array.prototype.slice.call(nodeList, 0);
    nodes.forEach(function(node){
      node.addEventListener('click', function(){
        
        // show popup
        var target = this.getAttribute('data-target');
        target = document.body.querySelector(target);
        target.classList.toggle('active');
        
        // show overlay
        overlay.classList.add('active');      
        
      });
    });
    
    // add click events for popups
    var crossList = document.body.querySelectorAll("[data-action='pop-close']");
    var crosses = Array.prototype.slice.call(crossList, 0);
    crosses.forEach(function(cross){
      cross.addEventListener('click', function(){
        var nodeList = document.body.querySelectorAll(".rl-pop");
        var nodes = Array.prototype.slice.call(nodeList, 0);
        nodes.forEach(function(node){
          node.classList.remove('active');
        });
        overlay.classList.remove('active');
      });
    });
    
    // create overlay & click event
    var overlay = document.createElement('div');
    overlay.className = "pop-overlay";
    document.getElementById('body').appendChild(overlay);
    overlay.addEventListener('click', function(){
      var nodeList = document.body.querySelectorAll(".rl-pop");
      var nodes = Array.prototype.slice.call(nodeList, 0);
      nodes.forEach(function(node){
        node.classList.remove('active');
      });
      overlay.classList.remove('active');
    });
  }

var $j = jQuery.noConflict();

$j(document).ready(function($) {


	// Flexslider init
	if ($j('.flexslider').length) {
		setTimeout(function(){
          $j('.flexslider').flexslider();
        }, 500);
	}


	// Product Page Zoom and Scroller

  if ($j('body').hasClass('catalog-product-view')) {

    var magicCounter = 0;

    if (is_touch_device() == true) {
      var clickOrTouch = "touchstart";
    } else {
      var clickOrTouch = "click";
    }

    //Product Page Type Flag
    var productBreadcrumb = $j('.breadcrumbs .product strong').text();

    if(/trousers|Trousers|dress|Dress/.test(productBreadcrumb)) {
      $('.MagicToolboxSelectorsContainer').addClass('shift-left');
    }

    var magicReady = setInterval(function(){

      if ($j('.mcs-button-arrow-next').length) {

        var getZoomId = $('.mz-thumb-selected').attr('data-zoom-id');
        var getScrollId = $('.mz-thumb-selected').closest('.MagicScroll').attr('id');

        $j('.mcs-button-arrow-next').bind(clickOrTouch, function(){
          MagicZoom.next(getZoomId);
        });

        $j('.mcs-button-arrow-prev').bind(clickOrTouch, function(){
          MagicZoom.prev(getZoomId);
        });

        $j('.mz-thumb').bind(clickOrTouch, function(){
          MagicScroll.forward(getScrollId, 1)
        });

        clearInterval(magicReady);
      } else {
        $j('.MagicZoom').css('opacity', '1');
      }

      $j( window ).resize(function() {
        var zoomImgHeight = $j('.MagicZoom').height();
        $j('.MagicScroll').css('height', zoomImgHeight);
      }).resize();

      //failsafe to stop setInterval after 30 seconds
      magicCounter++;

      if (magicCounter >= 60) {
        clearInterval(magicReady);
        console.log('FAIL and interval cleared');
      }

    }, 500);

  }

	//Product Page Video Flag
	if ($j('.product-collateral .video').length < 1) {
		$j('.product-collateral .technologies-wrapper').addClass('technologies-wrapper--fullWidth');
	}

  //Product Page Social Share
  var pathname = document.URL;
  var summary = document.title;
  var facebook = "http://www.facebook.com/sharer/sharer.php?u=" + pathname;
  var google = "https://plus.google.com/share?url=" + pathname;
  var twitter = "https://twitter.com/intent/tweet?text=" + summary + "&url=" + pathname;
  $j("#twittershare").attr("href", twitter);
  $j("#fbshare").attr("href", facebook);
  $j("#googleshare").attr("href", google);

  //Lev Wood rearrange blocks - remove when promo ends

  $j( window ).resize(function() {

    if ($(window).width() < 769) {
      $j('.lw-sideBar').prependTo($j('.pageSection--social'));
    } else {
       $j('.lw-sideBar').prependTo($j('.lw-sectionContainer'));
    }
  }).resize();

  $j('.lw-hero__playButton').click(function(){
    var videoContainer = $j('.lw-video');

    $j('.lw-hero--film').css('background', '#949993');
    $j('.lw-hero__playButton').css('display', 'none');
    $j('.lw-hero--film').append(videoContainer);
    videoContainer.css('display', 'block');

    if ($(window).width() < 769) {
      $j('.lw-hero--film').css('height', 'auto');
    }

  });

  if ($('body').hasClass('catalog-category-view')) {

    var getSizeFilters = $j('.amshopby-attr-solr_size_in_stock .amshopby-attr');

    getSizeFilters.each(function(){
      var getSizeFiltersText = $(this).text();

       if (getSizeFiltersText.indexOf('UK') >= 0) {
          $(this).css('display', 'none');
          $(this).parent().css('margin', '0');
       }

    }); 

  }



  //Micro Site - Scroll Arrow

  if ($('.micro-hero__arrow').length) {

    $('.micro-hero__arrow').delay(1200).animate({
      bottom: '56px'
    }, 300, function(){
      $('.micro-hero__arrow').animate({
        bottom: '48px'
      }, 120, function(){
        $('.micro-hero__arrow').stop(true, true);
      });
      
    });

    var scrollBottomStart = $(window).scrollTop() + $(window).height();

    $(window).on('scroll', function(){

        var scrollBottom = $(window).scrollTop() + $(window).height(), //get y value of bottom of window
            nextSectionPos = $j('.micro-nextSection').offset().top; // get y value of top of next page section

        if ((scrollBottom > nextSectionPos + 48) || (scrollBottom > scrollBottomStart + 300)) {
          $('.micro-hero__arrow').css('display', 'none');
          $(window).off('scroll'); // stops the scroll event from constantly firing
        }

    });
  }
  

  $j('.micro-video__playButton').click(function(){
    var videoContainer = $j('.micro-video');

    $j('.micro-hero--what').css('background', '#ccc');
    $j('.micro-hero--what .micro-hero__logo, .micro-hero--what .micro-hero__title, .micro-hero--what .micro-hero__subtext, .micro-hero--what .micro-hero__quoteContainer').css('display', 'none');
    $j('.micro-hero--what').append(videoContainer);
    videoContainer.css({
      'position': 'absolute',
      'top': '10%',
      'left': 0,
      'display': 'block',
      'width': '100%'}
      );

    if ($(window).width() < 769) {
      $j('.micro-hero--what').css('height', 'auto');
    }

  });

  /* Left Hand Nav show/hide */
  if ($j('#narrow-by-list').length) {

    $j('#narrow-by-list ol').each(function(){
      var numberOfSolrItems = $j(this).children().length;

      if (numberOfSolrItems > 5) {
        $j(this).children('li:nth-child(n+6)').css('display', 'none');
        $j(this).append('<p class="lhn-show-more-less"><a class="lhn-show-more-link">Show more +</a><a class="lhn-show-less-link">Show less -</a></p>');

        $j('.lhn-show-more-link').on('click', function(){
          $j(this).closest('ol').children('li:nth-child(n+6)').fadeIn(400);
          $j(this).css('display', 'none');
          $j(this).next('.lhn-show-less-link').css('display', 'block');
        });

        $j('.lhn-show-less-link').on('click', function(){
          $j(this).closest('ol').children('li:nth-child(n+6)').fadeOut(400);
          $j(this).css('display', 'none');
          $j(this).prev('.lhn-show-more-link').css('display', 'block');
        });
      }
    });  
  }

});
