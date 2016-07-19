angular.module('user').component('auth', {
  templateUrl: 'components/user/auth/auth/auth.template.html',
  controller: [function authCtrl() {
  	this.form = 'login';

    angular.element('.dropdown-menu').on({
      click: function(e) {
        e.stopPropagation();
      }
    });
  }]
});