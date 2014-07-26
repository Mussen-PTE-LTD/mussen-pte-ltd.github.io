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
$(document).ready(function () {
    affixWidth();
    $(window).resize(affixWidth);

    $('#products-list [href^=#]').click(function (e) {
      e.preventDefault();
      var pheader = $('.page-header');
      var lheight = ($('body').width() >= 768) ? 0 : $('#products-list').height();
      var div = $(this).attr('href');
      var pos = $(div).position().top;
      if (pos > 0 || lheight > 0) {
       pos += $('.navbar-wrapper').height() + pheader.height() + parseInt(pheader.css('marginTop')) + parseInt(pheader.css('paddingBottom')) + parseInt(pheader.css('borderBottomWidth')) + parseInt(pheader.css('marginBottom')) + lheight;
      }
      $("html, body").animate({ scrollTop: pos }, "slow");
      this.blur();
    });
});
