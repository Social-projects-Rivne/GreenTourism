angular.module('auth').component('login', {
  templateUrl: 'components/auth/login/login.template.html',
  controller: ['$location', function loginCtrl($location) {
    this.login = function(userDetails) {
      this.email = userDetails.email;
      this.password = userDetails.password;
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if (this.email == user.email && this.password == user.password) {
          $location.path('/profile');
        } else {
          this.message = 'Email or password is incorrect';
        }
      }
    };
  }]
});
