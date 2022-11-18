/*!
 * Author: Theme designed and developed by Michael Palmer, MP Web.
 * Website: https://www.michaelpalmerwebdesign.com.
 * Copyright MP Web 2018.
 * Template website: https://www.brutalist.design.
 */
(function () {

  //dom loaded
  $(function () {

    //Cache jQuery objects for reuse
    var ui_elem = {
      'carousel': $('#gallery-carousel'),
      'video': $('#video .owl-carousel'),
      'video_play': $('#video-wrap').children('p'),
      'mobile_nav_btn': $('#mobile-nav'),
      'mobile_nav': $('div.navigation'),
      'template_title': $('h1 a'),
    };

    //run preloader
    run_preloader();

    //gallery carousel
    if (ui_elem.carousel.length) {
      ui_elem.carousel.owlCarousel({
        items: 1,
        nav:true,
        dots:false,
        loop: true
      });
    }


    //Video carousel
    if (ui_elem.video.length) {
    ui_elem.video.owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        video:true,
        lazyLoad:false,
        autoHeight: true
      });
    }//Video carousel

    //YT video play - hide placeholder img
    ui_elem.video_play.on('click', function(){
      $(this).hide().next('img').hide();
      $(".active .owl-video-play-icon").trigger("click");
    });//end video play on click

    //nav style 2 mobile menu
    ui_elem.mobile_nav_btn.on('click', function(){
      ui_elem.mobile_nav.toggle();
    });

    //Nav click for template style 2. Jump to section with offset for fixed menu
    $(document).on('click', 'nav.nav-fs li.anchor > a[href^="#"]', function (event) {
      event.preventDefault();
      $('html, body').scrollTop($($.attr(this, 'href')).offset().top - $('nav').outerHeight());
    });//end template style 2 nav click

    //Adjust title letter spacing to fille parent container
    ui_elem.template_title.stretch_text();
  });//end dom loaded


  /**
   * Run the preloader:
   *
   * 1: Output the loading text, each letter of the loading text is output in 500ms increments
   * 2: Once the loading text is completed check if the youtube video has loaded
   * 3: When the youtube video is loaded remove the preloader
   */
  var interval = null, inc = 500;
  function run_preloader () {
    var p = $('p.loading-text'),
        preloader = $('.preloader');

    interval = setInterval(function(){
      var len = p.children('span').length, i = 0;
      for (i; i < len; i++) {
        if (!$(p.children('span')[i]).hasClass('load-letter')) {
          $(p.children('span')[i]).addClass('load-letter');
          return false;
        }
      }

      if ($('.load-letter').length === p.children('span').length) {

        setTimeout(function () {
          p.next('p').addClass('is-loaded');
        }, (inc));

        setTimeout(function () {
          clearInterval(interval);
          interval = null;
          $('body').removeClass('of-hidden');
          preloader.fadeOut('slow', function(){
            $(this).remove();
          });
        }, (inc*4));
      }
    }, inc);
  }//end fn run_preloader


  //Stretch title text to fit parent
  $.fn.stretch_text = function () {
    var elmt = $(this),
      cont_width = elmt.width(),
      txt = elmt.html();

    if (elmt.find('.stretch_it').length > 0) {
      txt = elmt.find('.stretch_it').html();
      elmt.html(txt);
    }

    var one_line = $('<span class="stretch_it">' + txt + '</span>'),
      nb_char = elmt.text().length,
      spacing = cont_width / nb_char,
      txt_width;

    elmt.html(one_line);
    txt_width = one_line.width();

    var char_width = txt_width / nb_char,
        ltr_spacing = spacing - char_width + (spacing - char_width) / nb_char;

    if (ltr_spacing < 0) {
      ltr_spacing = 0;
    }

    one_line.css({'letter-spacing': ltr_spacing});
  };


})($);
//# sourceMappingURL=main.js.map
