angular.module('user').directive('confirmPassword', [function() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      var password = '#' + attrs.confirmPassword;
      elem.add(password).on('keyup', function() {
        scope.$apply(function() {
          ctrl.$setValidity('validation', elem.val() ===
            angular.element(password).val());
        });
      });
    }
  };
}]);
