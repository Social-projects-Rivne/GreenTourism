//'use strict'
angular.module('signup', [])
.component('signup', {
    templateUrl: 'components/autorization/signup/signup.template.html',
    controller: function signupCtrl($http) {
        $http.get('components/autorization/users.json').then(function(response){
            users = response.data;
        });
        this.signup = function (userDetails) {
            this.name = userDetails.name;
            this.username = userDetails.username;
            this.password = userDetails.password;
            this.confirmpassword = userDetails.confirmpassword;
            if ( this.password == this.confirmpassword ) {
                     users.push ({})

            }

        };
    },
  });
