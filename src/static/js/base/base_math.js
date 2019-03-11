define(['jquery'], function ($) {
  var math = {
    add: function (i, j) {
      $('.math').text(i + j)
    }
  }
  return math;
})