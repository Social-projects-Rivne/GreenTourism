//'use strict';
angular.module('signin', [])
  .component('signin', {
    templateUrl: 'components/authorization/signin/signin.template.html',
    controller: function signinCtrl($http) {
      this.login = function(userDetails) {
        this.email = userDetails.email;
        this.password = userDetails.password;
        for (var i = 0; i < users.length; i++) {
          var user = users[i];
          if (this.email == user.email && this.password == user.password) {
            window.location.hash = '/profile';
          } else {
            this.message = 'Email or password is incorrect';
          }
        }
      };

      $http.get('components/authorization/users.json').then(function(response) {
        users = response.data;
      });
    }
  });
