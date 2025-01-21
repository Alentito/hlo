$(window).on('mousemove', function (page) {
    var sensibility = 0.1;
    var offX = sensibility - page.pageX / $(window).width();
    var offY = sensibility - page.pageY / $(window).height();

    $(".parallax").each(function (i, element) {
      var offset = parseInt($(element).data('offset'));
      var translateProperty = "translate3d(" + getTranslateValue(offX, offset) + "px," + getTranslateValue(
        offY, offset) + "px, 0px)";

      $(element).css({
        '-webkit-transform': translateProperty,
        'moz-transform': translateProperty,
        'transform': translateProperty,
      });
    });
  });

  function getTranslateValue(axisOffset, generalOffset) {
    return Math.round(axisOffset * generalOffset);
  }

  