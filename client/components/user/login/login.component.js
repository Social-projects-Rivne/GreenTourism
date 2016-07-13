angular.module('user').component('login', {
  templateUrl: 'components/user/login/login.template.html',
  controller: ['currentUser', '$location',
    function loginCtrl(currentUser, $location) {
      this.signup = true;
      this.toggleSignup = function() {
      	$this.signup = $this.signup === false ? true: false;
      };
      if (currentUser) {
        $location.path('/profile');
      }

    }
  ]
});
