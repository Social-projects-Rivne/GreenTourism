angular.module('user').component('signup', {
  templateUrl: 'components/user/signup/signup.template.html',
  controller: [function signupCtrl() {
    this.signup = function(isvalid) {
      if (!isvalid) {
        this.showError = true;
      }
    };

    this.getErrorpassword = function(error) {
      if (angular.isDefined(error)) {
        if (error.pattern) {
          return '1 Alphabet, 1 Number and 1 Special Character';
        } else if (error.maxlength) {
          return 'Sorry, but less then 25 characters is allowed';
        } else if (error.minlength) {
          return 'Please input more then 7 characters';
        } else if (error.match) {
          return 'Password isn\'t match';
        } else if (error.required) {
          return 'Please fill up this field';
        }
      }
    };

    this.getErroremail = function(error) {
      if (angular.isDefined(error)) {
        if (error.required) {
          return 'Please fill up this field';
        } else if (error.email) {
          return 'Please input correct email';
        } else if (error.pattern) {
          return 'Only top level domein is allowed';
        }
      }
    };

    this.getError = function(error) {
      if (angular.isDefined(error)) {
        if (error.required) {
          return 'Please fill up this field';
        } else if (error.minlength) {
          return 'Please input more then 2 characters';
        } else if (error.pattern) {
          return 'Only alphabet is required';
        } else if (error.maxlength) {
          return 'Sorry, but less then 15 characters is allowed';
        }
      }
    };
  }]
});
