angular.module('user').component('login', {
  templateUrl: 'components/user/login/login.template.html',
  controller: ['currentUser', '$location',
    function loginCtrl(currentUser, $location) {
    }
  ]
});
