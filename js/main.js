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
  $('.masonry').each( function(i, elem) {
    var $elem = $(elem);
    $elem.masonry('bindResize');
  });
}
$(document).ready(function () {
  affixWidth();
  $(window).resize(affixWidth);

  $('#products-list [href^=#]').click(function(e) {
    e.preventDefault();
    var body;
    if (/(chrom(e|ium)|applewebkit)/.test(navigator.userAgent.toLowerCase())) {
      body = $('body');
    } else {
      body = $('html, body');
    }
    var pheader = $('.page-header');
    var lheight = ($(body).width() >= 768) ? 0 : $('#products-list').height();
    var div = $(this).attr('href');
    var pos = $(div).position().top;
    var curpos = $(body).scrollTop();
    if (curpos == 0 || pos > 0 || lheight > 0) {
      pos += $('.navbar-wrapper').height() + pheader.height() + parseInt(pheader.css('marginTop')) + parseInt(pheader.css('paddingBottom')) + parseInt(pheader.css('borderBottomWidth')) + parseInt(pheader.css('marginBottom')) + lheight;
    }
    $(body).animate({ scrollTop: pos }, "slow");
    this.blur();
  });

  $('.back-to-top').click(function(e) {
    var body;
    if (/(chrom(e|ium)|applewebkit)/.test(navigator.userAgent.toLowerCase())) {
      body = $('body');
    } else {
      body = $('html, body');
    }
    $(body).animate({ scrollTop: 0 }, "slow");
    this.blur();
  });

  $('.thumbnail .caption').each(function(i, elem) {
    var rand = '';
    for (i = 0; i < 3; ++i) {
      rand += Math.floor(Math.random() * 50 + 200).toString(16);
    }
    $(elem).css('background-color', '#' + rand);
  });

  $('.masonry').each(function(i, elem) {
    var $elem = $(elem);
    $elem.masonry({
      itemSelector: '.item'
    }).imagesLoaded(function() {
      $elem.masonry();
    });
  });
});
