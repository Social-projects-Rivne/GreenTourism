angular.module('auth')
  .factory('AuthenticationService', ['$http', '$cookies', '$rootScope',
    function($http, $cookies, $rootScope) {
      var service = {};

      service.login = function(email, password, callback) {
        var authdata = btoa(email + ':' + password);

        var req = {
          method: 'POST',
          url: '/api/login',
          headers: {
            Authorization: 'Basic ' + authdata
          },
          data: {}
        }

        $http(req).then(function(response) {
          callback(response);
        });

        /* TODO: How it should be
        $http.post('/api/login', {email: email, password: password})
          .success(function(response) {
            callback(response);
          });
        */
      };

      service.setCredentials = function(email, password) {
        var authdata = btoa(email + ':' + password);

        $rootScope.globals = {
          currentUser: {
            email: email,
            authdata: authdata
          }
        };

        $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
        $cookies.put('globals', $rootScope.globals);
      };

      service.setUser = function(user) {
        var authdata = btoa(user.email + ':' + user.password);

        $rootScope.globals = {};

        $rootScope.globals.currentUser = user;
        $rootScope.globals.currentUser.authdata = authdata;

        $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
        $cookies.put('globals', $rootScope.globals);
      };

      service.clearCredentials = function() {
        $rootScope.globals = {};
        $cookies.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
      };

      return service;
    }
  ]);
