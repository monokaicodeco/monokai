jQuery(document).ready(function () {

  /*
   Top menu
   */
  $('.show-menu a, .hide-menu a').tooltip();
  // show/hide menu
  $('.show-menu a').on('click', function (e) {
    e.preventDefault();
    $(this).fadeOut(100, function () {
      $('nav').slideDown();
    });
  });
  $('.hide-menu a').on('click', function (e) {
    e.preventDefault();
    $('nav').slideUp(function () {
      $('.show-menu a').fadeIn();
    });
  });
  // navigation
  $('nav a').on('click', function (e) {
    e.preventDefault();
    var element_class = $(this).attr('class');
    var scroll_to = 0;
    var nav_height = $('nav').height();
    if (element_class == 'menu-top') {
      scroll_to = $(".top-content").offset().top;
    }
    else if (element_class == 'menu-features') {
      scroll_to = $(".features").offset().top - nav_height - 60;
    }
    else if (element_class == 'menu-download') {
      scroll_to = $(".call-to-action-text").offset().top - nav_height - 60;
    }
    else if (element_class == 'menu-subscribe') {
      scroll_to = $(".subscribe").offset().top - nav_height - 60;
    }
    else if (element_class == 'menu-testimonials') {
      scroll_to = $(".testimonials").offset().top - nav_height - 60;
    }
    else if (element_class == 'menu-about-us') {
      scroll_to = $(".whos-behind").offset().top - nav_height - 60;
    }
    else if (element_class == 'menu-contact') {
      scroll_to = $(".contact").offset().top - nav_height - 60;
    }

    if ($(window).scrollTop() != scroll_to && element_class !== undefined) {
      $('html, body').animate({scrollTop: scroll_to}, 1000);
    }
  });
  // learn more
  $('.top-arrow i').on('click', function () {
    var nav_height = $('nav').height();
    var nav_display = $('nav').css('display');
    var features_top = $('.features').offset().top;

    if (nav_display == 'block') {
      scroll_to = features_top - nav_height - 60;
    }
    else if (nav_display == 'none') {
      scroll_to = features_top - 60;
    }

    if ($(window).scrollTop() != scroll_to) {
      $('html, body').animate({scrollTop: scroll_to}, 1000);
    }
  });
  // features
  $('.features-box-1-icon').on('click', function () {
    var nav_height = $('nav').height();
    var nav_display = $('nav').css('display');
    var feature_index = $('.features-box-1-icon').index($(this));
    var feature_scroll_to = $('.single-feature-text').eq(feature_index).offset().top;

    if (nav_display == 'block') {
      scroll_to = feature_scroll_to - nav_height - 60;
    }
    else if (nav_display == 'none') {
      scroll_to = feature_scroll_to - 60;
    }

    if ($(window).scrollTop() != scroll_to) {
      $('html, body').animate({scrollTop: scroll_to}, 1000);
    }
  });

  /*
   Background slideshow
   */
  $('.top-content').backstretch([
    "assets/img/backgrounds/1.jpg"
    , "assets/img/backgrounds/2.jpg"
    , "assets/img/backgrounds/3.jpg"
  ], {duration: 3000, fade: 750});

  /*
   Testimonials
   */
  $('.testimonial-active').html('<p>' + $('.testimonial-single:first p').html() + '</p>');
  $('.testimonial-single:first .testimonial-single-image img').css('opacity', '1');

  $('.testimonial-single-image img').on('click', function () {
    $('.testimonial-single-image img').css('opacity', '0.5');
    $(this).css('opacity', '1');
    var new_testimonial_text = $(this).parent('.testimonial-single-image').siblings('p').html();
    $('.testimonial-active p').fadeOut(300, function () {
      $(this).html(new_testimonial_text);
      $(this).fadeIn(400);
    });
  });

  /*
   Google maps
   */
  var position = new google.maps.LatLng(33.795368, -84.4016772);
  $('.contact-address .map').gmap({
    'center': position, 'zoom': 15, 'disableDefaultUI': true, 'callback': function () {
      var self = this;
      self.addMarker({'position': this.get('map').getCenter()});
    }
  });


  /*
   Subscription form
   */
  $('.success-message').hide();
  $('.error-message').hide();

  $('.subscribe form').submit(function (e) {
    e.preventDefault();
    var postdata = $('.subscribe form').serialize();
    $.ajax({
      type: 'POST',
      url: 'assets/subscribe.php',
      data: postdata,
      dataType: 'json',
      success: function (json) {
        if (json.valid == 0) {
          $('.success-message').hide();
          $('.error-message').hide();
          $('.error-message').html(json.message);
          $('.error-message').fadeIn();
        }
        else {
          $('.error-message').hide();
          $('.success-message').hide();
          $('.subscribe form').hide();
          $('.success-message').html(json.message);
          $('.success-message').fadeIn();
        }
      }
    });
  });

  /*
   Play Dog Dog Audio
   */
  var audio = $("#chuck-bark-audio")[0];
  $("#chuck-bark-icon").mouseenter(function() {
    audio.play();
  });

  /*
   Contact form
   */
  $('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function () {
    $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
  });
});

