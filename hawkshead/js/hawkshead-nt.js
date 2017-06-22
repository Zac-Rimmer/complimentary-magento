/*
  Hawkshead site specific JS snippets
*/


 var $j = jQuery.noConflict();

$j(document).ready(function($) {


  $j('.block-title').click(function() {
    $j('#narrow-by-list').toggleClass('no-display');
    $j('.block-title').toggleClass('block-title--open');
  });

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

  //Contact us pop up
   $j('.form_popup').click(function(){
    $j('.contact__popup').addClass('popup_open');
    $j('.form_popup').addClass('popup_open');
    $j('.popup__bg').addClass('popup_open');
    $('body').addClass('no_scroll');
    $('body').bind('touchmove', function(e){e.preventDefault()}); //mobile disable scroll
  });

  $j('#form__close').click(function(){
    $j('.contact__popup').removeClass('popup_open');
    $j('.form_popup').removeClass('popup_open');
    $j('.popup__bg').removeClass('popup_open');
    $('body').removeClass('no_scroll');
    $('body').unbind('touchmove'); //mobile enable scroll
  });
  /* END */


  /* mobile seo toggle hide/show */
  if (document.documentElement.clientWidth < 771) {
    var catname = jQuery('body').attr('class');
    if($j('.pageintro p').length > 1) {
      $j('.pageintro p:last-of-type').css('display','none');
      //$j('.pageintro p').append('<div class="gradient"><img src="https://dbdhuxde2t9el.cloudfront.net/AW16/img/global/category/vertical-fade.png" style="width: 100%; height: 45px;"></div>');
      $j('.pageintro p:first-of-type').after('<div class="mobileseo-container"><div class="gradient"><img src="https://dbdhuxde2t9el.cloudfront.net/AW16/img/global/category/vertical-fade.png" style="width: 100%; height: 45px;"></div><a><div class="seemore">Read more</div></a></div>');
      $j('.pageintro p:last-of-type').append('<a><div class="seemore">Read more</div></a>');
    }

    $j('.seemore').click(function(){
      $j('.pageintro p:last-of-type').toggleClass('category-description');
      $j('.pageintro p:first-of-type .seemore').toggleClass('toggle-removebttn');
      $j('.pageintro p:last-of-type').toggleClass('more-paragraph');
      $j('.mobileseo-container').toggleClass('close');
      $j('.pageintro p:first-of-type').toggleClass('displayall');
      $j('.pageintro p:last-of-type .seemore').addClass('readless-bttn');
      $j('.pageintro p:last-of-type .seemore.readless-bttn').html('Less');
      $j('.gradient').toggleClass('gradient-toggle')
      ga('send', 'event', 'read-more-button', 'click', ''+catname+'');
    });

    $j('.pageintro p:last-of-type .seemore.readless-bttn').click(function(){
      ga('send', 'event', 'read-less-button', 'click', ''+catname+'');
    });
  };

  /* END */
  


});