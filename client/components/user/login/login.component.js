angular.module('user').component('login', {
  templateUrl: 'components/user/login/login.template.html',
  controller: [function loginCtrl() {
    angular.element('.dropdown-menu').on({
      click: function(e) {
        e.stopPropagation();
      }
    });
  }]
});
