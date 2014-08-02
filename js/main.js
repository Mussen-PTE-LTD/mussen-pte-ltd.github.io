// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

function affixWidth() {
  var $elem = $('#products-list');
  $elem.width($elem.parent().width());
}

$(document).ready(function() {
  var $window = $(window);

  var body;
  if (/(chrom(e|ium)|applewebkit)/.test(navigator.userAgent.toLowerCase())) {
    body = $('body');
  } else {
    body = $('html, body');
  }
  var $body = $(body);

  var $scrollSpy = $('body[data-spy="scroll"]');
  var $navBar = $('.navbar-wrapper');
  var $pageHeader = $('.page-header');
  var $productList = $('#products-list');

  affixWidth();
  $window.resize(affixWidth);

  $('.masonry').each(function(i, elem) {
    var $elem = $(elem);
    $elem.masonry({
      itemSelector: '.item',
      transitionDuration: '0s'
    }).imagesLoaded(function() {
      $elem.masonry();
    }).masonry('on', 'layoutComplete', function(instance, items) {
      if (! $elem.data('inlayoutComplete')) {
        $elem.data('inlayoutComplete', true);
        setTimeout(function() {
          $elem.masonry().data('inlayoutComplete', false);
          $scrollSpy.scrollspy('refresh');
        }, 300);
      }
    });
  });

  $('#products-list [href^=#]').click(function(e) {
    e.preventDefault();
    var productListHeight = ($body.width() >= 768) ? 0 : $productList.outerHeight(true);
    var div = $(this).attr('href');
    var pos = $(div).position().top;
    var curpos = $body.scrollTop();
    if (curpos == 0 || pos > 0 || productListHeight > 0) {
      pos += $navBar.outerHeight(true) + $pageHeader.outerHeight(true) + productListHeight;
    }
    $body.animate({ scrollTop: pos }, "slow");
    this.blur();
  });

  $('.back-to-top').click(function(e) {
    $body.animate({ scrollTop: 0 }, "slow");
    this.blur();
  });

  $('.js-random-color').each(function(i, elem) {
    var rand = '';
    for (i = 0; i < 3; ++i) {
      rand += Math.floor(Math.random() * 50 + 200).toString(16);
    }
    $(elem).css('background-color', '#' + rand);
  });

  $window.on("load", function() {
    if (/-ref$/.test(window.location.hash)) {
      $body.imagesLoaded(function() {
        var pos = $(window.location.hash).position().top;
        var productListHeight = ($body.width() >= 768) ? 0 : $productList.outerHeight(true);
        $body.scrollTop(pos + $navBar.outerHeight(true) + $pageHeader.outerHeight(true) + productListHeight);
      });
    }

    if (/success-confirmation$/.test(window.location.hash)) {
      $('#success-confirmation').removeClass('hidden');
    }
  });

  $('#contactForm').validate({
    messages: {
      name: {
        required: "Please enter your name.",
        minlength: jQuery.validator.format("Please enter at least {0} characters.")
      },
      phone: "Please enter your phone number.",
      _replyto: "Please enter your email address.",
      message: {
        required: "Please enter your message.",
        maxlength: jQuery.validator.format("Please enter at most {0} characters.")
      }
    },
    errorPlacement: function(label, element) {
      label.addClass('alert alert-warning');
      label.insertBefore(element.parent());
    },
    wrapper: 'div'
  });
});
