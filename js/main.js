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
  $('#products-list').width($('#products-list').parent().width());
}

$(document).ready(function() {
  var body;
  if (/(chrom(e|ium)|applewebkit)/.test(navigator.userAgent.toLowerCase())) {
    body = $('body');
  } else {
    body = $('html, body');
  }
  var $body = $(body);

  affixWidth();
  $(window).resize(affixWidth);

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
          $('[data-spy="scroll"]').scrollspy('refresh');
        }, 300);
      }
    });
  });

  $('#products-list [href^=#]').click(function(e) {
    e.preventDefault();
    var pheader = $('.page-header');
    var lheight = ($body.width() >= 768) ? 0 : $('#products-list').outerHeight(true);
    var div = $(this).attr('href');
    var pos = $(div).position().top;
    var curpos = $body.scrollTop();
    if (curpos == 0 || pos > 0 || lheight > 0) {
      pos += $('.navbar-wrapper').outerHeight(true) + pheader.outerHeight(true) + lheight;
    }
    $body.animate({ scrollTop: pos }, "slow");
    this.blur();
  });

  $('.back-to-top').click(function(e) {
    $body.animate({ scrollTop: 0 }, "slow");
    this.blur();
  });

  $('.thumbnail .caption').each(function(i, elem) {
    var rand = '';
    for (i = 0; i < 3; ++i) {
      rand += Math.floor(Math.random() * 50 + 200).toString(16);
    }
    $(elem).css('background-color', '#' + rand);
  });
});
