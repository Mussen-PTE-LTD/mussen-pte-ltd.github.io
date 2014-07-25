function affixWidth() {
    $('#products-list').width($('#products-list').parent().width());
}
$(document).ready(function () {
    affixWidth();
    $(window).resize(affixWidth);

    $('#products-list [href^=#]').click(function (e) {
      e.preventDefault();
      this.blur();
      var pheader = $('.page-header');
      var lheight = ($('body').width() >= 768) ? 0 : $('#products-list').height();
      var div = $(this).attr('href');
      var pos = $(div).position().top;
      if (pos > 0 || lheight > 0) {
       pos += $('.navbar-wrapper').height() + pheader.height() + parseInt(pheader.css('marginTop')) + parseInt(pheader.css('paddingBottom')) + parseInt(pheader.css('borderBottomWidth')) + parseInt(pheader.css('marginBottom')) + lheight;
      }
      $("html, body").animate({ scrollTop: pos }, "slow");
    });
});
