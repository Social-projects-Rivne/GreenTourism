//'use strict';
angular.module('login', [])
.component('login', {
    templateUrl: 'components/autorization/login/login.template.html',
    controller: function msgCtrl($http) {
        $http.get('components/autorization/users.json').then(function(response) {
            users = response.data;
        });
            this.submit=function (userDetails) {
                this.email = userDetails.email;
                this.password = userDetails.password;
                for (var i = 0; i < users.length; i++){
                    var user = users[i];
                        if (this.email == user.email && this.password == user.password){
                            window.location.hash = "/profile"
                        }else{
                            this.message = "No such user here";
                        };
                };
            };
   },
  });
