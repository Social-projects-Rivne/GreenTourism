angular.module('welcomePage', []);

angular.module('welcomePage').component('welcomePage', {
  templateUrl: 'components/welcome-page/welcome-page.template.html',
  controller: function() {
    var page = angular.element('html, body');
    angular.element('a[href="#main-page-content"]').click(function() {
      var heightScroll = page.outerHeight();
      page.animate({
        scrollTop: heightScroll
      }, 1000);
      return false;
    });
  }
});
