app.factory('User', function() {

  function User(data) {
    if (data) {
      this.setData(data);
    }
  }

  User.prototype.setData = function(data) {
    angular.extend(this, data);
  };

  User.prototype.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
  };

  return User;
});
