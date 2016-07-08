angular.module('auth').component('login', {
  templateUrl: 'components/auth/login/login.template.html',
  controller: ['$location', '$rootScope', 'AuthenticationService',
    function loginCtrl($location, $rootScope, AuthenticationService) {
      // AuthenticationService.clearCredentials();

      this.login = function(user) {
        AuthenticationService.login(user.email, user.password,
          function(response) {
            if (response.data) {
              AuthenticationService.setUser(response.data);
              $location.path('/profile');
            } else {
              console.log(response);
            }
          }
        );
      };
    }
  ]
});
