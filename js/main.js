function affixWidth() {
    $('#products-list').width($('#products-list-parent').width());
}
$(document).ready(function () {
    affixWidth();
    $(window).resize(affixWidth);
});
