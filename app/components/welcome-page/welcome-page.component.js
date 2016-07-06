angular.module('welcomePage', []);

angular.module('welcomePage').component('welcomePage', {
  templateUrl: 'components/welcome-page/welcome-page.template.html',
  controller: function() {
    var $page = $('html, body');
    $('a[href="#content"]').click(function() {
      var heightScroll = $($.attr(this, 'href')).offset().top - 50;
      $page.animate({
        scrollTop: heightScroll
      }, 1000);
      return false;
    });
  }
});
