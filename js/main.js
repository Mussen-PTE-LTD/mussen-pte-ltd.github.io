function affixWidth() {
    $('#products-list').width($('#products-list').parent().width());
}
$(document).ready(function () {
    affixWidth();
    $(window).resize(affixWidth);

    $('#products-list [href^=#]').click(function (e) {
      e.preventDefault();
      var div = $(this).attr('href');
      var pheader = $('.page-header');
      var plist = $('#products-list');
      var plheight = (plist.css('position') == 'static') ? plist.height() : 0;
      var pos = $(div).position().top;
      if (pos > 0 || plheight > 0) {
       pos += $('.navbar-wrapper').height() + pheader.height() + parseInt(pheader.css('marginTop')) + parseInt(pheader.css('paddingBottom')) + parseInt(pheader.css('borderBottomWidth')) + parseInt(pheader.css('marginBottom')) + plheight;
      }
      $("html, body").animate({ scrollTop: pos }, "slow");
    });

    $("a").each(function() {
        this.onmouseup = this.blur();
    });
});
