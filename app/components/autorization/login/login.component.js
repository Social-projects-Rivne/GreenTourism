'use strict';

angular.module('login', [])
.component('login', {
    templateUrl: 'components/autorization/login/login.template.html',
    controller: function msgCtrl() {
        this.submit=function (userDetails) {
            this.name = userDetails.name;
            this.password = userDetails.password;

            var modeluser = [{
                "username": "admin",
                "email": "rudyktaras@gmail.com",
                "password": "admin",
                },{
                "username": "taras",
                "email": "rudyktaras@gmail.com",
                "password": "taras",
                }]


           if (this.name == "admin"  && this.password == "admin" ){
               window.location.hash = "/places"
           }else{
               this.message = "no such user here";
           }
       };
   },
  });


  // $http.get('components/autorization/users.json').then(function(response) {
  //   users.email = response.data;
  //   users.password = response.data;
  // });

  // var arr = [ {"id":"10", "class": "child-of-9"}, {"id":"11", "classd": "child-of-10"}];
  //
  //    for(var i=0;i<arr.length;i++){
  //        var obj = arr[i];
  //        for(var key in obj){
  //            var attrName = key;
  //            var attrValue = obj[key];
  //        }
  //    }
